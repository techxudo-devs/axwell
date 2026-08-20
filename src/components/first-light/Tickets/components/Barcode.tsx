interface BarcodeProps {
  color?: string;
}

const Barcode = ({ color = "black" }: BarcodeProps) => (
  <svg
    viewBox="0 0 100 100"
    className="w-full h-full opacity-90"
    preserveAspectRatio="none"
  >
    <rect x="0" width="4" height="100" fill={color} />
    <rect x="8" width="2" height="100" fill={color} />
    <rect x="14" width="6" height="100" fill={color} />
    <rect x="24" width="1" height="100" fill={color} />
    <rect x="28" width="4" height="100" fill={color} />
    <rect x="36" width="2" height="100" fill={color} />
    <rect x="42" width="8" height="100" fill={color} />
    <rect x="54" width="1" height="100" fill={color} />
    <rect x="58" width="5" height="100" fill={color} />
    <rect x="66" width="3" height="100" fill={color} />
    <rect x="72" width="6" height="100" fill={color} />
    <rect x="82" width="2" height="100" fill={color} />
    <rect x="88" width="4" height="100" fill={color} />
    <rect x="94" width="6" height="100" fill={color} />
  </svg>
);

export default Barcode;
