import categories from '~/data/categories';

export const getTitleByUrl = (url: string | null) => {
    const categoriesBread = categories.map((item) => ({ title: item.title, url: item.url }));
    const newUrls = [
        { title: 'Самое сочное', url: '/juicy' },
        { title: 'Новый рецепт', url: '/new-recipe' },
    ];
    const breads = [...categoriesBread, ...newUrls];
    const bread = breads.find((b) => b.url === `/${url}`);
    return bread ? bread.title : url;
};

export const getTitleBySlug = (slug: string, title: string) => {
    if (slug === 'the-juiciest') return 'Самое сочное';
    if (slug === 'new-recipe') return 'Новый рецепт';
    return title;
};
