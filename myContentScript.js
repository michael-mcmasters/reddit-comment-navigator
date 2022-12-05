const viewEntireDiscussionInfo = { selector: ".j9NixHqtN2j8SKHcdJ0om", innerText: "View Entire Discussion" }
const sortByButtonInfo = { selector: "#CommentSort--SortPicker", innerText: "Sort By:" }
const topOptionInfo = { selector: "._10K5i7NW6qcm-UoCtpB3aK", innerText: "top" }


window.onload = function expandComments() {
    const viewEntireDiscussion = queryElement(viewEntireDiscussionInfo);
    viewEntireDiscussion?.click();

    const sortByButton = queryElement(sortByButtonInfo);
    sortByButton?.click();

    const topOption = queryElement(topOptionInfo);
    topOption?.click();
}

function queryElement(elementInfo) {
    const elements = document.querySelectorAll(elementInfo.selector);
    for (const e of elements) {
        if (e.textContent.toLowerCase().includes(elementInfo.innerText.toLowerCase())) {
            return e;
        }
    }
}