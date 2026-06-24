import Button from './Button';

export default function IconButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  children,
  className = '',
  ...rest
}) {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      aria-label={ariaLabel}
      className={className}
      {...rest}
    >
      {children}
    </Button>
  );
}
