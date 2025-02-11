export function sanitise(source: string) {
  return source.trim().replaceAll('\n', ' ');
}
