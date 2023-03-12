import { useDebouncedValue, useEventListener } from "@mantine/hooks";
import { createRef } from "react";
import { TransitionGroup } from "react-transition-group";

// generic ??
export interface GenericCarouselProps {
  title: React.ReactElement;
  render: React.FunctionComponent<{ item: any, index: number }>;
  data: any[];
  withSeparator?: boolean;
  separator?: React.ReactElement;
  withTransition?: boolean;
}

export default function GenericCarousel(props: GenericCarouselProps) {
  const { title, data, render, withSeparator = false, separator = null, withTransition = false } = props;
  const dataRef = data.map((item) => { return { ...item, ref: createRef() } });
  return (
    <div className='flex flex-col gap-2 h-64'>
      {title}
      {(withSeparator && separator) && separator}
      {withTransition ? (
        <TransitionGroup className="flex gap-2 p-2 overflow-hidden">
          {dataRef.map((item, index) => { return render({ item, index }) })}
        </TransitionGroup>
      ) : (
        <div className="flex gap-2 p-2 overflow-hidden">
          {dataRef.map((item, index) => { return render({ item, index }) })}
        </div>
      )
      }
    </div>
  )
}
