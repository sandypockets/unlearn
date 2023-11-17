import categories from '@/categories.json';

export function formatUrlString(string) {
  return string?.replaceAll('&', 'and').replaceAll(' ', '-').toLowerCase();
}

export function capitalizeWords(string) {
  return string
    ?.split(' ')
    .map(word => (word === 'and' ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

export function findParentCategory(subcategoryValue) {
  for (const categoryGroup of categories) {
    if (categoryGroup.options.some(option => option.value === subcategoryValue)) {
      return categoryGroup['groupLabel'];
    }
  }
  return '';
}

export function generateFactId() {
  return `fact-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
}
