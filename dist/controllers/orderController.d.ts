import { Request, Response } from 'express';
export declare const getOrders: (_req: Request, res: Response) => Promise<void>;
export declare const createOrder: (req: Request, res: Response) => Promise<void>;
export declare const updateOrder: (req: Request, res: Response) => Promise<void>;
export declare const deleteOrder: (req: Request, res: Response) => Promise<void>;
