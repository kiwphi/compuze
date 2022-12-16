import { Comment } from '../db/comment-db.js';

export async function findComments(itemId) {
    return await Comment.fetchByItemId(itemId);
}

export async function findCommentById(commentId) {
    return await Comment.fetchById(commentId);
}

export async function createComment({ content, userId, itemId }) {
    const comment = new Comment({
        content: content,
        userId: userId,
        itemId: itemId,
    });

    return await comment.save();
}

export async function removeCommentById(commentId) {
    await Comment.deleteById(commentId);
}

export function isAuthorOfComment(user, comment) {
    return user.id == comment.user_id;
}
