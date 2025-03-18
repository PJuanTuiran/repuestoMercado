export const highlightEmptySelects = (
    motorbikeSelected: boolean,
    electricSelected: boolean,
    truckSelected: boolean,
    vanSelected: boolean
) => {
    document
        .querySelectorAll(".select-container .open-button")
        .forEach((el: HTMLSelectElement) => {
            el.classList.remove("empty");

            if (
                el.dataset.value === undefined &&
                !(
                    (el.dataset.type.toLowerCase() === "tracción" &&
                        (motorbikeSelected || truckSelected || vanSelected)) ||
                    (el.dataset.type.toLowerCase() === "transmisión" &&
                        (electricSelected || truckSelected ))
                )
            ) {
                el.classList.add("empty");
            }
        });
};

export const closeWindow = () => {
    //document.getElementById("filter-wrapper").classList.add("hidden");
};
