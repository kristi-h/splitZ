import html2pdf from "html2pdf.js";
import Button from "./Button";

// Add data-html2canvas-ignore class to hide element

const DownloadPDF = ({ filename, contentRef }) => {
  const pdfOptions = {
    filename,
    margin: 16,
  };

  const convertToPDF = async () => {
    const content = contentRef.current;
    html2pdf().set(pdfOptions).from(content).save();
  };

  return (
    <div>
      <Button onClick={convertToPDF} variant={"small"} className={"my-2"}>
        Download PDF
      </Button>
    </div>
  );
};

export default DownloadPDF;
