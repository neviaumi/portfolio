export function sanitise(source: string) {
  return source.replaceAll('\n', ' ');
}
