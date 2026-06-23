import styles from './Skeleton.module.css';

export default function Skeleton({
  height = 16,
  width = '100%',
  radius = 'var(--radius-sm)',
  className = '',
}) {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      style={{ height, width, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

