const viewEntireDiscussionInfo = { selector: ".j9NixHqtN2j8SKHcdJ0om", innerText: "View Entire Discussion" }
const sortByButtonInfo = { selector: "#CommentSort--SortPicker", innerText: "Sort By:" }
const topOptionInfo = { selector: "._10K5i7NW6qcm-UoCtpB3aK", innerText: "top" }

const topCommentSet = new Set();
const topLevelComments = [];
let currentIndex = 0;

window.onload = function expandComments() {
    const viewEntireDiscussion = queryElement(viewEntireDiscussionInfo);
    viewEntireDiscussion?.click();

    const sortByButton = queryElement(sortByButtonInfo);
    sortByButton?.click();

    const topOption = queryElement(topOptionInfo);
    topOption?.click();

    addCommentsAsTheyAppear();
    handleKeyboardCommentScrolling();
}

function queryElement(elementInfo) {
    const elements = document.querySelectorAll(elementInfo.selector);
    for (const e of elements) {
        if (e.textContent.toLowerCase().includes(elementInfo.innerText.toLowerCase())) {
            return e;
        }
    }
}

function addCommentsAsTheyAppear() {
    const observer = new MutationObserver((mutationList, observer) => {
        const eles = document.querySelectorAll("._3sf33-9rVAO_v4y0pIW_CH");
        if (eles.length > 0) {
            for (const e of eles) {
                if (e.style.paddingLeft === "16px" && !topCommentSet.has(e.id)) {
                    topCommentSet.add(e.id);
                    topLevelComments.push(e);
                    console.log("Got top level comment")
                }
            }
        }
    });
    
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);
}

function handleKeyboardCommentScrolling() {
    document.body.addEventListener("keydown", (event) => {
        console.log(topLevelComments)
        if (event.key === "1") {
            console.log("down")
            --currentIndex;
        } else if (event.key === "2") {
            console.log("up")
            ++currentIndex;
        }

        console.log(topLevelComments[currentIndex])
        topLevelComments[currentIndex].focus()
        topLevelComments[currentIndex].scrollIntoView(true);
        window.scrollBy(0, -45);

        const innerCommentEle = topLevelComments[currentIndex].querySelectorAll("._3tw__eCCe7j-epNCKGXUKk")[0];
        innerCommentEle.classList.add("_1vvFtxiq5874iIdCUYlL-d");
        // Adds border style, but j and keys will still move from another comment.
    })
}