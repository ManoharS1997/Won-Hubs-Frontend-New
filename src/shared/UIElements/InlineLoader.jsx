export default function InlineLoader({ width = 12, height = 12, color = 'var(--primary-color)' }) {
    return (
        <div
            className={`border-4 border-white rounded-full inline-block box-border animate-spin`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                borderBottomColor: color
            }}
        ></div>
    );
}
