import {
  BlocksIcon,
  EclipseIcon,
  FastForwardIcon,
  LanguagesIcon,
  MonitorSmartphoneIcon,
  RocketIcon,
  ScanFaceIcon,
  SquarePenIcon,
} from "lucide-react";
import { Item, ItemIcon, ItemTitle, ItemDescription } from "../../ui/item";
import { Section } from "../../ui/section";

export default function Items() {
  return (
    <Section>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-20">
        <h2 className="max-w-[560px] text-center text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <div className="grid auto-rows-fr grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <ScanFaceIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Accessibility first
            </ItemTitle>
            <ItemDescription>
              Fully WCAG 2.0 compliant, made with best a11y practices
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <MonitorSmartphoneIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Responsive design
            </ItemTitle>
            <ItemDescription>
              Looks and works great on any device and screen size
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <EclipseIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Light and dark mode
            </ItemTitle>
            <ItemDescription>
              Seamless switching between color schemes, 6 themes included
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <BlocksIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Easy to customize
            </ItemTitle>
            <ItemDescription>
              Flexible options to match your product or brand
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <FastForwardIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Top-level performance
            </ItemTitle>
            <ItemDescription>
              Made for lightning-fast load times and smooth interactions
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <RocketIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Production ready
            </ItemTitle>
            <ItemDescription>
              Thoroughly tested and launch-prepared
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <LanguagesIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              Made for localisation
            </ItemTitle>
            <ItemDescription>
              Easy to implement support for multiple languages and regions
            </ItemDescription>
          </Item>
          <Item>
            <ItemTitle className="flex items-center gap-2">
              <ItemIcon>
                <SquarePenIcon className="h-5 w-5 stroke-1" />
              </ItemIcon>
              CMS friendly
            </ItemTitle>
            <ItemDescription>
              Built to work with your any headless content management system
            </ItemDescription>
          </Item>
        </div>
      </div>
    </Section>
  );
}
