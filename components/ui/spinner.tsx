import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      data-slot="spinner"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Status is exposed on the SVG while preserving the icon's SVG props/ref API.
      role="status"
      aria-label="Cargando"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
