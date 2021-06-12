import { HttpStatus } from '../../constant/httpStatus';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  res.status(HttpStatus.ok).json({ name: 'John Doe' });
};
