import { formatGqlQuery, gql } from './graphql.ts';
import { sanitise } from './test-helper.ts';

const cmsBaseUrl = process.env['TESTS_CMS_BASE_URL'];
if (!cmsBaseUrl) {
  throw new Error('TESTS_CMS_BASE_URL is not defined');
}

function covertRichTextFieldToAriaYml(
  richTextField: Record<string, any>,
  indent = 2,
): string {
  const INDENT_SPACE = ' '.repeat(indent);

  function processNode(node: any, currentIndent: string): string {
    if (!node || !node.type) return '';

    switch (node.type) {
      case 'h1': // Heading Level 1
      case 'h2': // Heading Level 2
      case 'h3': // Heading Level 3
      case 'h4': // Heading Level 4
      case 'h5': // Heading Level 5
      case 'h6': {
        // Heading Level 6
        const headingText = sanitise(collectText(node.children));
        const level = parseInt(node.type.replace('h', ''), 10); // Extract heading level
        return `${currentIndent}- heading "${headingText}" [level=${level}]`;
      }

      case 'li': // List Item
        return processNode(node.children[0], currentIndent); // Process inner "lic"

      case 'lic': {
        // List Item Content
        const listItemText = sanitise(collectText(node.children));
        return `${currentIndent}- listitem: ${listItemText}`;
      }

      case 'p': {
        // Paragraph
        const paragraphText = sanitise(collectText(node.children));
        return `${currentIndent}- paragraph: "${paragraphText}"`;
      }

      case 'text': // Text Node
        return sanitise(node.text || '');

      case 'ul': {
        // Unordered List
        const listItems = node.children
          .map((child: any) => processNode(child, currentIndent + INDENT_SPACE))
          .filter(Boolean)
          .join('\n');
        return `${currentIndent}- list:\n${listItems}`;
      }

      default:
        return ''; // Ignore unknown types
    }
  }

  function collectText(children: any[]): string {
    return children
      .map((child: any) => {
        if (child.type === 'text') return child.text;
        if (child.children) return collectText(child.children);
        return '';
      })
      .join('');
  }

  const result = richTextField['children']
    .map((child: any) => processNode(child, INDENT_SPACE))
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
