import React, { useContext } from "react";
import { FeedContext } from "pages/Feed.js";
import ButtonTag from "../Tag/ButtonTag";
import LocationSearch from "components/Input/LocationSearch";
import { FilterAccordion, FilterAccordionPanel } from "./StyledAccordion";

const FilterAccord = () => {
  const feedContext = useContext(FeedContext);
  const { filters, activePanel, handleOption, selectedOptions } = feedContext;

  function capitalizeFirstLetter(header) {
    // capitalize first letter and show providers if  header is fromWhom
    if (header === "fromWhom") {
      header = "providers";
    }
    return header.charAt(0).toUpperCase() + header.slice(1);
  }
  const renderPanels = () => {
    return filters.map((filter, idx) => {
      if (filter.label === "location") {
        return (
          <FilterAccordionPanel
            header={capitalizeFirstLetter(filter.label)}
            className={filter.className}
            key={idx}
          >
            <LocationSearch />
          </FilterAccordionPanel>
        );
      } else {
        return (
          <FilterAccordionPanel
            header={capitalizeFirstLetter(filter.label)}
            className={filter.className}
            key={idx}
          >
            {Object.values(filter.options).map((option, idx) => {
              return (
                <ButtonTag
                  key={idx}
                  onClick={handleOption(filter.label, option)}
                  className={
                    "tag-selectable " +
                    (selectedOptions[filter.label] &&
                    selectedOptions[filter.label].includes(option)
                      ? "tag-selected"
                      : "")
                  }
                >
                  {option}
                </ButtonTag>
              );
            })}
          </FilterAccordionPanel>
        );
      }
    });
  };

  return (
    <FilterAccordion
      accordion
      defaultActiveKey={activePanel}
      className="my-accordion"
    >
      {renderPanels()}
    </FilterAccordion>
  );
};

export default FilterAccord;
