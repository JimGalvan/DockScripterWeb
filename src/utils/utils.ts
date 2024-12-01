import {ExpenseDto, ExpenseResponseDto} from '../types/expense';

const parseExpenseResponseDto = (responseDto: ExpenseResponseDto): ExpenseDto => {
    return {
        amount: responseDto.amount,
        categoryId: responseDto.categoryId,
        description: responseDto.description,
    };
};

const isColorLight = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

export default isColorLight;
export {parseExpenseResponseDto};

