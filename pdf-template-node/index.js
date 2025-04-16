const PDFDocument = require("pdfkit");
const fs = require("fs");

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream("Kalaivanan_Resume.pdf"));

function sectionTitle(title) {
  doc
    .moveDown(0.5)
    .fontSize(14)
    .fillColor("#005792")
    .text(title.toUpperCase(), { underline: false })
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, doc.y + 3)
    .lineTo(550, doc.y + 3)
    .stroke()
    .moveDown(0.5);
}

const imagePath = "23PA06.jpg";
if (fs.existsSync(imagePath)) {
  doc
    .image(imagePath, 400, 40, { width: 100 })
    .rect(400, 40, 100, 128)
    .stroke();
}

doc
  .fillColor("#1a1a1a")
  .fontSize(26)
  .text("Kalaivanan V", 50, 50)
  .moveDown(0.2)
  .fontSize(13)
  .fillColor("#444")
  .text("Software Developer", { continued: true })
  .fillColor("#888")
  .text("   |   Chennai, India")
  .moveDown(0.5)
  .fillColor("#333")
  .fontSize(11)
  .text("Email: kalaivkv24@gmail.com")
  .text("Phone: +91 81221 72308")
  .text("GitHub: github.com/kalaivkv")
  .text("Portfolio: kalaivanan.dev")
  .moveDown(1);

sectionTitle("Profile");
doc
  .fontSize(11)
  .fillColor("#222")
  .text(
    "Passionate frontend developer with experience in building responsive and user-friendly web applications using React.js, Material UI, and modern CSS frameworks."
  );

sectionTitle("Skills");
doc
  .fontSize(11)
  .fillColor("#333")
  .list([
    "Languages: HTML, CSS, JavaScript, TypeScript",
    "Frameworks: React.js, Redux, Material UI, Bootstrap, Tailwind CSS",
    "Tools: Git, VS Code, Vite, Chrome DevTools",
  ])
  .moveDown(0.5);

sectionTitle("Experience");
doc
  .fontSize(12)
  .fillColor("#111")
  .text("Software Developer Intern – Taizo Technologies Private Limited, Chennai", {
    bold: true,
  })
  .fontSize(10)
  .fillColor("#555")
  .text("Dec 2024 – Apr 2025")
  .fontSize(11)
  .fillColor("#333")
  .list([
    "Built and maintained responsive interfaces using React and Material UI",
    "Integrated REST APIs and improved dashboard UI",
    "Participated in team code reviews",
  ])
  .moveDown(0.5);

sectionTitle("Education");
doc
  .fontSize(12)
  .fillColor("#111")
  .text("Postgraduate in Applied Mathematics")
  .fontSize(10)
  .fillColor("#555")
  .text("PSG College Of Technology, Coimbatore | 2023 – 2025")
  .fontSize(11)
  .fillColor("#333")
  .text("Project: Merging Styles in a Collaborative Digital Space")
  .moveDown(1);

doc.end();

doc.on("finish", async () => {
  const open = (await import("open")).default;
  await open("Kalaivanan_Resume.pdf");
});
