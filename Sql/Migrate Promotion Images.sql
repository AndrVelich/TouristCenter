Use travelxb_db

INSERT INTO PromotionImage (PromotionId, ImageId)
Select Promotion_PromotionId, ImageId
FROM Images
WHERE Promotion_PromotionId Is not null

--ALTER TABLE Images
--DROP CONSTRAINT [FK_dbo.Images_dbo.Promotions_Promotion_PromotionId]

--DROP INDEX IX_Promotion_PromotionId ON Images;

--ALTER TABLE Images
--DROP COLUMN Promotion_PromotionId;