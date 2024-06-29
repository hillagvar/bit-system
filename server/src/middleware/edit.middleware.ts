const editMiddleware = (req: any, res: any, next: any) => {

    if (req.user.type == 1) {
        next();
    } else {
        return res.status(401).json({
            "text": "Neturite teisių peržiūrėti šio puslapio."
        });
    }
};

export { editMiddleware }
