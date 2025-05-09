import { useEffect, useState } from 'react';

import { useLazyGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { selectAllCategories, selectAllSubCategories } from '~/store/category-slice';
import { useAppSelector } from '~/store/hooks';
import { Recipe } from '~/types/apiTypes';

const useRandomCategory = (activeCategoryId: string | null) => {
    const categories = useAppSelector(selectAllCategories);
    const subCategories = useAppSelector(selectAllSubCategories);

    const [randomTitle, setRandomTitle] = useState('');
    const [randomDescription, setRandomDescription] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [fetchByCategory] = useLazyGetRecipesByCategoryQuery();

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!categories.length || !subCategories.length) return;

            const otherCategories = categories.filter((cat) => cat._id !== activeCategoryId);
            if (!otherCategories.length) return;

            const randomCategory =
                otherCategories[Math.floor(Math.random() * otherCategories.length)];
            const subcats = subCategories.filter(
                (sub) => sub.rootCategoryId === randomCategory._id,
            );
            if (!subcats.length) return;

            setRandomTitle(randomCategory.title);
            setRandomDescription(randomCategory.description);

            fetchByCategory({ id: subcats[0]._id });

            const collected: Recipe[] = [];
            const seen = new Set<string>();

            for (const sub of subcats) {
                try {
                    const { data } = await fetchByCategory({ id: sub._id, limit: 5 }).unwrap();
                    for (const recipe of data || []) {
                        if (!seen.has(recipe._id)) {
                            seen.add(recipe._id);
                            collected.push(recipe);
                        }
                        if (collected.length >= 5) break;
                    }
                    if (collected.length >= 5) break;
                } catch (error) {
                    console.error('Ошибка при получении данных ', sub._id, error);
                }
            }
            setRecipes(collected);
        };

        fetchRecipes();
    }, [activeCategoryId, categories, subCategories, fetchByCategory]);

    return { randomRecipes: recipes, randomTitle, randomDescription };
};

export default useRandomCategory;
