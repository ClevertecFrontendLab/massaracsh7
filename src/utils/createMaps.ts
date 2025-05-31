export function createMaps<T extends { _id: string; title: string }>(items: T[]) {
    return {
        titleToIdMap: Object.fromEntries(items.map((c) => [c.title, c._id])),
        idToTitleMap: Object.fromEntries(items.map((c) => [c._id, c.title])),
    };
}
