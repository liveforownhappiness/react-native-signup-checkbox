import React, { SetStateAction } from 'react';
type CheckTermProps = {
    label: string;
    necessary: boolean;
    link: string;
    linkLabel?: string;
    index: number;
    checked: boolean;
};
export type CheckTermsProps = {
    data: CheckTermProps[];
    setTermsEable: React.Dispatch<SetStateAction<boolean>>;
    essential: string;
    optional: string;
    selectAll: string;
};
export declare const CheckTerms: (props: CheckTermsProps) => any;
export {};
//# sourceMappingURL=index.d.ts.map