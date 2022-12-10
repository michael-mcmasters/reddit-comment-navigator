"use strict";

class CommentNavigator {

    constructor() {
        this.topLevelCommentsMap = new Map();     
        this.currentCommentIndex = 0;   
    }

    enableNavigation() {
        // onNewCommentAppears
        // onKeyboardEnter
        this.addCommentsAsTheyAppear();
        this.handleKeyboardCommentScrolling();
    }

    addCommentsAsTheyAppear() {
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

    handleKeyboardCommentScrolling() {
        document.body.addEventListener("keydown", (event) => {
            if (event.key !== "1" && event.key !== "2")
                return;
            
            switch (event.key) {
                case "1":
                    if (this.currentCommentIndex > 0) {
                        --this.currentCommentIndex
                    }
                    break;
                case "2":
                    if (this.currentCommentIndex < this.topLevelCommentsMap.size - 1) {
                        ++this.currentCommentIndex
                    } else {
                        alert("This is the last comment");
                    }
                    break;
            }

            this.goToComment(this.currentCommentIndex);
        })
    }

    goToComment(currentCommentIndex) {
        this.topLevelCommentsMap.get(currentCommentIndex).focus()
        this.topLevelCommentsMap.get(currentCommentIndex).scrollIntoView(true);
        window.scrollBy(0, -45);

        const innerCommentEle = this.topLevelCommentsMap.get(currentCommentIndex).querySelectorAll("._3tw__eCCe7j-epNCKGXUKk")[0];
        // innerCommentEle.classList.add("_1vvFtxiq5874iIdCUYlL-d");
        // Adds border style, but j and keys will still move from another comment.
    }
}