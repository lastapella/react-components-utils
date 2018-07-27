export default function getComponentDisplayName(Component: React.ComponentClass | React.SFC) {
	return Component.displayName || Component.name || 'Unknown';
}