ALTER TABLE commercial_deals ADD COLUMN owner TEXT DEFAULT '';

UPDATE commercial_deals
SET
  owner = trim(substr(remark, instr(remark, '承接：') + 3)),
  remark = trim(rtrim(substr(remark, 1, instr(remark, '承接：') - 1), '；; '))
WHERE instr(remark, '承接：') > 0
  AND trim(coalesce(owner, '')) = '';

UPDATE commercial_deals
SET
  owner = trim(substr(remark, instr(remark, '承接推荐：') + 5)),
  remark = trim(rtrim(substr(remark, 1, instr(remark, '承接推荐：') - 1), '；; '))
WHERE instr(remark, '承接推荐：') > 0
  AND trim(coalesce(owner, '')) = '';
