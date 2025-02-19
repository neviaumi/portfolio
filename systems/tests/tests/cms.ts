import { formatGqlQuery, gql } from './graphql.ts';
import { sanitise } from './test-helper.ts';

const cmsBaseUrl = process.env['TESTS_CMS_BASE_URL'];
if (!cmsBaseUrl) {
  throw new Error('TESTS_CMS_BASE_URL is not defined');
}

function covertRichTextFieldToAriaYml(
  richTextField: Record<string, any>,
  baseIndent = 2,
): string {
  const BASE_INDENT_SPACE = ' '.repeat(baseIndent);

  function processNode(node: any, currentIndentLevel: number): string {
    if (!node || !node.type) return '';

    // Calculate indentation: base indent + dynamic level indentation
    const currentIndent = BASE_INDENT_SPACE + ' '.repeat(currentIndentLevel);

    switch (node.type) {
      case 'h1': // Heading Level 1
      case 'h2': // Heading Level 2
      case 'h3': // Heading Level 3
      case 'h4': // Heading Level 4
      case 'h5': // Heading Level 5
      case 'h6': {
        // Process headings
        const headingText = sanitise(collectText(node.children));
        const level = parseInt(node.type.replace('h', ''), 10); // Extract heading level
        return `${currentIndent}- heading "${headingText}" [level=${level}]`;
      }

      case 'li': {
        // List Item
        return processNode(node.children[0], currentIndentLevel); // Process inner "lic"
      }

      case 'lic': {
        // List Item Content
        const listItemText = sanitise(collectText(node.children));
        return `${currentIndent}- listitem: "${listItemText}"`;
      }

      case 'p': {
        // Process paragraph
        const paragraphText = sanitise(collectText(node.children));
        return `${currentIndent}- paragraph: "${paragraphText}"`;
      }

      case 'text': {
        // Text Node
        return sanitise(node.text || '');
      }

      case 'ul': {
        // Process unordered list
        const listItems = node.children
          .map(
            (child: any) =>
              processNode(child, currentIndentLevel + baseIndent + 2), // Increase indent for nested items
          )
          .filter(Boolean)
          .join('\n');
        return `${currentIndent}- list:\n${listItems}`;
      }

      default:
        return ''; // Ignore unsupported types
    }
  }

  // Helper to collect and concatenate text from children
  function collectText(children: any[]): string {
    return children
      .map((child: any) => {
        if (child.type === 'text') return child.text;
        if (child.children) return collectText(child.children);
        return '';
      })
      .join('');
  }

  // Process the entire rich text field
  const result = richTextField['children']
    .map((child: any) => processNode(child, 0)) // Start with 0 dynamic indentation
    .filter(Boolean)
    .join('\n');

  return result;
}

function gqlRequest(query: ReturnType<typeof gql>, variables?: unknown) {
  return fetch(new URL('/graphql', cmsBaseUrl), {
    body: JSON.stringify({
      query: formatGqlQuery(query),
      variables,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(async res => {
    return res.json();
  });
}

export default { covertRichTextFieldToAriaYml, gqlRequest };
