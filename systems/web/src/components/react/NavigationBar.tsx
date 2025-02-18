import AppBar, { DrawerToggleButton } from './AppBar.tsx';

export default function TopNavigation({ title }: { title: string }) {
  return (
    <AppBar
      leadingComponent={<DrawerToggleButton title={title} />}
      title={title}
    />
  );
}
