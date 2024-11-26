import { ITEMS_PER_PAGE } from '@/data/constants';
import { Architecture, ArchitectureResponse } from '@/types';
import { faker } from '@faker-js/faker';

export const mockArchitectures = Array(0);
for (let i = 2; i <= 138; i++) {
    mockArchitectures.push({
        id: i,
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        cost: faker.number.int({ min: 100000, max: 10000000 }),
        createdAt: faker.date.past({ years: 2 }).toISOString().split('T')[0],
        stars: faker.number.int({ min: 0, max: 1000 }),
        imports: faker.number.int({ min: 0, max: 100 }),
        tags: faker.helpers.arrayElements(
            [
                'React',
                'JavaScript',
                'Frontend',
                'Node.js',
                'Backend',
                'API',
                'TypeScript',
                'GraphQL',
                'Fullstack',
                'Python',
                'Django',
                'Java',
                'Spring',
                'Microservices',
                'Kotlin',
                'Android',
                'Mobile',
                'Swift',
                'iOS',
                'Go',
                'Ruby',
                'Rails',
                'PHP',
                'Laravel',
                'C#',
                '.NET',
            ],
            { min: 1, max: 4 },
        ),
    });
}

export const mockFetch = async (
    apiUrl: string,
): Promise<ArchitectureResponse> => {
    const [, params] = apiUrl.split('?');
    const searchParams = new URLSearchParams(params);
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sort') || '';
    const order = searchParams.get('order') || '';

    let filteredData = [...mockArchitectures];

    if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
            (item) =>
                item.title.toLowerCase().includes(searchLower) ||
                item.author.toLowerCase().includes(searchLower) ||
                item.tags.some((tag: string) =>
                    tag.toLowerCase().includes(searchLower),
                ),
        );
    }

    if (sortBy) {
        filteredData.sort((a: Architecture, b: Architecture) => {
            const modifier = order === 'desc' ? -1 : 1;
            const aValue = a[sortBy as keyof Architecture];
            const bValue = b[sortBy as keyof Architecture];
            return aValue > bValue ? modifier : -modifier;
        });
    }

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
        total: filteredData.length,
        data: filteredData.slice(start, end),
    };
};
