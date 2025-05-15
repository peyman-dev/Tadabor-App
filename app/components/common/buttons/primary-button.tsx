import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { Loader2 } from 'lucide-react';

// Define the props interface
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
}

// Define the component
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, loading, className, ...rest }) => {
    return (
        <button
            type="button"
            {...rest}
            className={cn(
                'bg-gradient-to-r from-[#E6C472] to-[#CDA84D] text-white cursor-pointer',
                className, {
                "opacity-70": loading
            }
            )}
            disabled={loading}
        >
            {loading ?
                <div className='flex items-center gap-2 justify-center'>
                    <Loader2 className='animate-spin size-6 opacity-80' />
                    <div className="text-sm">
                        منتظر بمانید
                    </div>
                </div> : children}
        </button>
    );
};


// Switch to default PrimaryButton
export default PrimaryButton;