import jsPDF from "jspdf";

export interface ResourceForPDF {
  title: string;
  excerpt: string;
  categories: string;
  tags: string;
  year: number;
  url: string;
  source?: string;
  date?: string;
}

export interface ListForPDF {
  title: string;
  resources: ResourceForPDF[];
  createdBy: string;
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function renderSimplePDF(pdf: jsPDF, listData: ListForPDF) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 25;
  const lineHeight = 7;
  let yPosition = margin;

  // Add title
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text(listData.title, pageWidth / 2, yPosition, { align: "center" });
  yPosition += lineHeight * 2;

  // Add creator info
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Created by: ${listData.createdBy}`, margin, yPosition);
  yPosition += lineHeight;

  // Add resource count and date
  pdf.text(
    `${listData.resources.length} resource${listData.resources.length !== 1 ? "s" : ""} • Created on ${new Date().toLocaleDateString()}`,
    margin,
    yPosition
  );
  yPosition += lineHeight * 2;

  // Add resources
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Resources:", margin, yPosition);
  yPosition += lineHeight * 1.5;

  listData.resources.forEach((resource, index) => {
    // Check if we need a new page
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = margin;
    }

    // Resource title
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    const title = `${index + 1}. ${resource.title}`;
    pdf.text(title, margin, yPosition);
    yPosition += lineHeight;

    // Year
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Published on: ${resource.year}`, margin, yPosition);
    yPosition += lineHeight;

    // Categories
    if (resource.categories) {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`Topic: ${resource.categories}`, margin, yPosition);
      yPosition += lineHeight;
    }

    // Tags
    if (resource.tags) {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(`Type: ${resource.tags}`, margin, yPosition);
      yPosition += lineHeight;
    }

    // URL
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = margin;
    }
    pdf.setTextColor(59, 130, 246); // Blue color
    pdf.text(`View Resource: ${resource.url}`, margin, yPosition);
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += lineHeight * 2;

    // Excerpt (split into multiple lines if needed)
    pdf.setFontSize(10);
    const excerptLines = pdf.splitTextToSize(
      resource.excerpt,
      pageWidth - 2 * margin
    );
    excerptLines.forEach((line: string) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  });

  // Add footer
  if (yPosition > 250) {
    pdf.addPage();
    yPosition = margin;
  }
  const footerFontSize = 10;
  pdf.setFontSize(footerFontSize);
  pdf.setFont("helvetica", "normal");
  const footerText = "Generated from ";
  const imageHeight = footerFontSize;
  const imageWidth = footerFontSize; // Assume square favicon
  const gap = 2; // 2mm gap between text and image
  const textWidth = pdf.getTextWidth(footerText);
  const totalWidth = textWidth + gap + imageWidth;
  const startX = (pageWidth - totalWidth) / 2;
  const textY = yPosition + imageHeight - 2; // -2 for vertical alignment

  pdf.text(footerText, startX, textY);
  pdf.addImage(
    "/favicon-for-public/web-app-manifest-512x512.png",
    "PNG",
    startX + textWidth + gap,
    yPosition,
    imageWidth,
    imageHeight
  );
}

export const exportListToPDF = async (listData: ListForPDF) => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    renderSimplePDF(pdf, listData);
    const sanitizedTitle = listData.title
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const sanitizedCreator = listData.createdBy
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const fileName = `${sanitizedTitle}_${sanitizedCreator}_resources.pdf`;
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};

export const generatePDFBlob = async (
  listData: ListForPDF
): Promise<string> => {
  try {
    const pdf = new jsPDF("p", "mm", "a4");
    renderSimplePDF(pdf, listData);
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    return blobUrl;
  } catch (error) {
    console.error("Error generating PDF blob:", error);
    throw new Error("Failed to generate PDF");
  }
};
