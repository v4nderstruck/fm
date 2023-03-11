// generic ??
export interface GenericCarouselProps {
    title: React.ReactElement;
  render: React.FunctionComponent<{item: any, index: number}>;
    data: any[];
    withSeparator?: boolean;
    separator?: React.ReactElement;
}

export default function GenericCarousel(props: GenericCarouselProps) {
    const { title, data, render, withSeparator = false, separator = null } = props;
    return (
        <div className='flex flex-col gap-2 h-64'>
            {title}
            {(withSeparator && separator) && separator}
            <div className="flex gap-2 p-2 overflow-hidden">
                {data.map((item, index) => { return render({item, index}) })}
            </div>
        </div>
    )
}
