"use strict";

class CommentNavigator {

    constructor() {
        this.topLevelCommentsMap = new Map();
        this.currentCommentIndex = 0;
        this.topCommentScrollOffset = 45;
    }

    enableNavigation() {
        this.collectCommentsAsTheyAppear();
        this.navigateCommentsOnKeydown();
    }

    collectCommentsAsTheyAppear() {
        const observer = new MutationObserver((mutationList, observer) => {
            const elements = document.querySelectorAll("._3sf33-9rVAO_v4y0pIW_CH");
            if (elements.length > 0) {
                let index = 0;
                for (const e of elements) {
                    if (e.style.paddingLeft === "16px" && !this.topLevelCommentsMap.has(e.id)) {
                        this.topLevelCommentsMap.set(index, e);
                        index++;
                        console.log("Got top level comment")
                    }
                }
            }
        });
        
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(document.body, config);
    }

    navigateCommentsOnKeydown() {
        document.body.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "1":
                    this.findPreviousClosestComment();
                    if (this.currentCommentIndex > 0) {
                        // this.goToComment(--this.currentCommentIndex);
                    }
                    break;
                case "2":
                    this.findNextClosestComment();
                    if (this.currentCommentIndex < this.topLevelCommentsMap.size - 1) {
                        // this.goToComment(++this.currentCommentIndex);
                    } else {
                        alert("This is the last comment");
                    }
                    break;
            }
        })
    }

    // Iterate through elements, store previous elements
    // When find first positive top rect element, you know previous element is above page. Navigate to it.
    findPreviousClosestComment() {
        let previousKey = 0;
        for (let [key, value] of this.topLevelCommentsMap) {
            const elementPositionRect = this.topLevelCommentsMap.get(key).getBoundingClientRect();
            console.log(elementPositionRect.top, elementPositionRect.right, elementPositionRect.bottom, elementPositionRect.left);
            if (elementPositionRect.top >= 0) {
                this.currentCommentIndex = previousKey;
                this.goToComment(previousKey);
                break;
            }
            previousKey = key;
        }
    }

    findNextClosestComment() {
        const isAlmostEqualToZero = (val) => val > -1 && val < 1;

        for (let [key, value] of this.topLevelCommentsMap) {
            const elementPositionRect = this.topLevelCommentsMap.get(key).getBoundingClientRect();
            console.log(elementPositionRect.top, elementPositionRect.right, elementPositionRect.bottom, elementPositionRect.left);
            const elementHeightIgnoringHeaderBar = elementPositionRect.top - this.topCommentScrollOffset;
            // Get first element with positive top rect because means it's on screen,
            // but make sure it's not exactly almost equal to 0. Because if so, we are probably navigated onto this comment perfectly, so go to next comment.
            if (elementHeightIgnoringHeaderBar > 0 && !isAlmostEqualToZero(elementHeightIgnoringHeaderBar)) {
                this.currentCommentIndex = key;
                this.goToComment(key);
                break;
            }
        }
    }

    goToComment(currentCommentIndex) {
        this.topLevelCommentsMap.get(currentCommentIndex).focus()
        this.topLevelCommentsMap.get(currentCommentIndex).scrollIntoView(true);
        // window.scrollBy(0, -45);
        window.scrollBy(0, -this.topCommentScrollOffset);

        const innerCommentEle = this.topLevelCommentsMap.get(currentCommentIndex).querySelectorAll("._3tw__eCCe7j-epNCKGXUKk")[0];
        // innerCommentEle.classList.add("_1vvFtxiq5874iIdCUYlL-d");
        // Adds border style, but j and keys will still move from another comment.
    }
}