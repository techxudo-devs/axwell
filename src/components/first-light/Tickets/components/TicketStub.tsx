import Barcode from "./Barcode";

interface TicketStubProps {
  barcodeColor: string;
  borderClassName: string;
}

const TicketStub = ({ barcodeColor, borderClassName }: TicketStubProps) => (
  <div
    className={`relative w-[22%] flex items-center justify-center p-4 pl-6 border-l border-dashed ${borderClassName}`}
  >
    <div className="w-full h-full max-h-[110px]">
      <Barcode color={barcodeColor} />
    </div>
  </div>
);

export default TicketStub;
