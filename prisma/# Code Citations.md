# Code Citations

## License: unknown
https://github.com/techcaptain83/Message-sender/tree/4596861baff7ce9dd3b33f77e455555dc283002e/backend/src/modules/auth/authController.ts

```
signup = async (req: Request, res: Response) => {
         try {
             const { name, email, password } = req.body;

             if (!name || !email || !password) {
                 return res.status(400).json({
```

