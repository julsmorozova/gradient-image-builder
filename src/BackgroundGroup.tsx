import Accordion from "./Accordion";
import { BackgroundGroupType, GradientObjectAction } from "./store";

type BackgroundGroupProps = {
  id: BackgroundGroupType["id"];
  name: BackgroundGroupType["name"];
  items: string[];
  isGroupOpen?: boolean;
  onAccordionToggle: GradientObjectAction["toggleGroupAccordion"];
  children: JSX.Element[];
  draggable: boolean;
};

export default function BackgroundGroup({
  id,
  name,
  items,
  isGroupOpen,
  onAccordionToggle,
  children,
  draggable,
}: BackgroundGroupProps) {
  return (
    items && (
      <div className="background-group">
        <Accordion
          isOpen={isGroupOpen}
          onToggle={() => onAccordionToggle(id)}
          isLayerHidden={false}
          draggable={draggable}
          headerContent={
            <div className="background-group-name">
              <span className="folder-icon"></span>
              {name}
            </div>
          }
          customHideTooltipLabel="Hide group layers"
          customShowTooltipLabel="Show group layers"
        >
          {children}
        </Accordion>
      </div>
    )
  );
}
