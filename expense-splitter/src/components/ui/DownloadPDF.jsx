import html2pdf from "html2pdf.js";
import Button from "./Button";

const DownloadPDF = ({ filename, contentRef }) => {
  const pdfOptions = {
    filename,
    margin: 10,
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
