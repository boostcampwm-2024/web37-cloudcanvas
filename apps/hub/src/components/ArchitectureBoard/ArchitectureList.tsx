import { ArchitectureItem } from './ArchitectureItem';

export const ArchitectureList = ({ data }: { data: Array<any> }) => {
    if (!data?.length) {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="text-center py-10 text-gray-500">
                    No architectures found.
                </div>
            </div>
        );
    }

    return (
        <div className="mb-10">
            {data.map((item) => (
                <ArchitectureItem key={item.id} {...item} />
            ))}
        </div>
    );
};
