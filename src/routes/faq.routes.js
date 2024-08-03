import express from "express";
import {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  createFaqCategory,
  getAllFaqCategories,
  deleteFaqCategory,
  updateFaqCategory,
} from "../controllers/faq.controller.js";

const faqRoutes = express.Router();

// FAQ routes
faqRoutes.post("/faq", createFaq);
faqRoutes.get("/faq/:id", getFaqById);
faqRoutes.get("/faqs", getAllFaqs);
faqRoutes.put("/faq/:id", updateFaq);
faqRoutes.delete("/faq/:id", deleteFaq);


// FAQ Category routes
faqRoutes.post("/faq-category", createFaqCategory);
faqRoutes.get("/faq-categories", getAllFaqCategories);
faqRoutes.put("/faq-category/:id", updateFaqCategory);
faqRoutes.delete("/faq-category/:id", deleteFaqCategory);

export default faqRoutes;
