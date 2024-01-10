import * as React from "react";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@yext/pages-components";
import { BiCaretRightCircle, BiCaretLeftCircle } from "react-icons/bi";
import Slider from "react-slick";
import { getRuntime, isProduction } from "@yext/pages/util";

export interface CarouselProps {
  title?: string;
  photoGallery?: any;
}

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretRightCircle
      className={className}
      color="#000000"
      style={{
        ...style,
        height: "50px",
        width: "30px",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = ({ className, style, onClick }: ArrowProps) => {
  return (
    <BiCaretLeftCircle
      style={{
        ...style,
        height: "50px",
        width: "30px",
        zIndex: 10,
      }}
      className={className}
      color="#000000"
      size={50}
      onClick={onClick}
    />
  );
};

const Carousel = ({ title, photoGallery }: CarouselProps) => {
  let dummyPhotos = [
    {
      test: true,
      description: "Placeholder Image",
      details: "Placeholder Image",
      image: {
        alternateText: "Placeholder Image",
        height: 800,
        url: "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
        width: 1200,
      },
    },
    {
      test: true,
      description: "Placeholder Image",
      details: "Placeholder Image",
      image: {
        alternateText: "Placeholder Image",
        height: 800,
        url: "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
        width: 1200,
      },
    },
    {
      test: true,
      description: "Placeholder Image",
      details: "Placeholder Image",
      image: {
        alternateText: "Placeholder Image",
        height: 800,
        url: "https://i0.wp.com/theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png?fit=1200%2C800&ssl=1",
        width: 1200,
      },
    },
  ];
  if (!photoGallery) {
    photoGallery = dummyPhotos;
  } else if (photoGallery.length < 3) {
    photoGallery = photoGallery.concat(dummyPhotos);
  }

  const photoDivs = photoGallery.map((e) => (
    <div key={e.image.url} className="self-center hover:drop-shadow-lg sm:px-2">
      <a href={e.image.url} target="_blank" rel="noreferrer">
        {e.test ? (
          <img src={e.image.url} className="rounded-md"></img>
        ) : (
          <Image image={e.image} className="rounded-md" />
        )}
      </a>
    </div>
  ));

  const settings: Settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    lazyLoad: "ondemand",
    swipeToSlide: false,
    prevArrow: <PrevArrow className="" />,
    nextArrow: <NextArrow className="" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          arrows: false,
        },
      },
    ],
  };

  // const SliderComponent = dynamic(() => import("react-slick"));
  const SliderComponent =
    // @ts-ignore
    getRuntime().name === "node" ? Slider.default : Slider;
  // const SliderComponent =
  //   typeof window === "undefined" ? Slider.default : Slider;
  // const SliderComponent = Slider;
  // const SliderComponent = Slider.default;
  // console.log(Slider);

  return (
    <>
      <div className="mx-auto px-5 md:px-14 bg-gray-100 pt-8 pb-24">
        <h2 className="section text-3xl text-center tracking-tight font-bold">
          <a id="gallery">{title}</a>
        </h2>
        <SliderComponent
          {...settings}
          className="drop-shadow sm:px-3 sm:mx-3  md:px-5"
        >
          {photoDivs}
        </SliderComponent>
      </div>
    </>
  );
};

export default Carousel;

type DynamicOptions = {
  componentName?: string;
  loading?: () => React.JSX.Element;
};

/**
 * const SliderComponent = dynamic(() => import("react-slick"), {
 *   loading: () => <h1>hi</h1>,
 * });
 *
 * @param importComponent
 * @param options
 * @returns
 */
function dynamic(
  importComponent: () => Promise<any>,
  options?: DynamicOptions
) {
  const resolvedOptions = {
    componentName: "default",
    loading: () => <></>,
    ...options,
  };

  class AsyncComponent extends React.Component<any, any> {
    constructor(props: React.JSX.Element) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const component = await importComponent();

      if (!component[resolvedOptions.componentName]) {
        console.error(
          `Exported function "${resolvedOptions.componentName}" does not exist for dynamic import: ${importComponent}`
        );
      }

      this.setState({
        component: component[resolvedOptions.componentName],
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : resolvedOptions.loading();
    }
  }

  return AsyncComponent;
}
