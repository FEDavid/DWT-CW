import emailjs from "@emailjs/browser";

export const sendLocationEmail = async ({ lat, lng, name }) => {
  const map_link = `https://maps.google.com/?q=${lat},${lng}`;
  const timestamp = new Date().toLocaleString();

  try {
    await emailjs.send(
      "contact_service",
      "template_q35s0jr",
      {
        lat,
        lng,
        name,
        map_link,
        timestamp,
        title: name
      },
      "wtfUsb_Qf6KL50Nns"
    );

    console.log("Email sent");
  } catch (err) {
    console.error("Email failed", err);
  }
};