export function generateImageUrl(entityId: string) {
  return new Date().toISOString() + entityId;
}
