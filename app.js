window.onload = () => {
    console.log('onload')
    const commentExpander = new CommentExpander();
    commentExpander.expandComments();
    
    const commentNavigator = new CommentNavigator();
    commentNavigator.enableNavigation();
}