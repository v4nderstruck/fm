export interface GenericCarouselProps {
    title: React.ReactElement;
    render: React.FunctionComponent<any>;
    data: any[];
    withSeparator?: boolean;
    separator?: React.ReactElement;
}

export default function GenericCarousel(props: GenericCarouselProps) {
    const { title, data, render, withSeparator = false, separator = null } = props;
    return (
        <div className='flex flex-col gap-2'>
            {title}
            {(withSeparator && separator) && separator}
            <div className="flex gap-4 p-2 bg-red-100 rounded-md overflow-hidden">
                {data.map((item, index) => { return render(item) })}
            </div>
        </div>
    )
}