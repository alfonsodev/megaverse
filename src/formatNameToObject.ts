export function formatNameToObject(name: string): {
  direction?: string;
  color?: string;
} | null {
  if (name.includes('COMETH')) {
    return { direction: name?.split('_')?.[0]?.toLowerCase() };
  } else if (name.includes('SOLOON')) {
    return { color: name?.split('_')[0]?.toLowerCase() };
  } else if (name === 'POLYANET') {
    return {};
  } else {
    return null;
  }
}
