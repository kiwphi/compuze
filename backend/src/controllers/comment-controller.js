import {
    createComment,
    findCommentById,
    findComments,
    isAuthorOfComment,
    isCommentLast,
    removeCommentById,
} from '../services/comment-service.js';
import { findItemById } from '../services/item-service.js';

// GET /[itemId]/comments
export async function getComments(req, res, next) {
    try {
        const item = await findItemById(req.params.itemId);

        if (!item) {
            return next();
        }

        const comments = await findComments(req.params.itemId);

        res.status(200).json({
            success: true,
            message: 'Comments fetched successfully',
            data: {
                comments: comments,
                itemId: req.params.itemId,
            },
        });
    } catch (err) {
        next(err);
    }
}

// GET /comments/[commentId]
export async function getComment(req, res, next) {
    try {
        const comment = await findCommentById(req.params.commentId);

        if (!comment) {
            return next();
        }
        return res.status(200).json({
            success: true,
            message: 'Comment fetched successfuly',
            data: {
                comment: comment,
            },
        });
    } catch (err) {
        next(err);
    }
}

// POST /comments
export async function postComment(req, res, next) {
    try {
        const item = await findItemById(req.body.itemId);

        if (!item) {
            return next();
        }

        if (req.errors.length) {
            return res.status(422).json({
                success: false,
                message: 'Failed to post comment',
                errors: req.errors,
            });
        }

        const commentId = await createComment({
            content: req.body.content,
            userId: req.user.id,
            itemId: req.body.itemId,
        });

        const comment = await findCommentById(commentId);

        res.status(201).json({
            success: true,
            message: 'Comment posted succesfully',
            data: {
                comment: comment,
            },
        });
    } catch (err) {
        next(err);
    }
}

// DELETE /comment/[commentId]
export async function deleteComment(req, res, next) {
    try {
        const comment = await findCommentById(req.params.commentId);

        if (!comment) {
            return next();
        }

        if (!(await isCommentLast(comment))) {
            return res.status(403).json({
                success: false,
                message: 'Only authorized to delete last comment',
            });
        }

        if (!isAuthorOfComment(req.user, comment)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete comment',
            });
        }

        await removeCommentById(req.params.commentId);
        res.status(200).json({
            success: true,
            message: `Comment #${req.params.commentId} deleted`,
        });
    } catch (err) {
        next(err);
    }
}
