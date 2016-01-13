'use strict'

const NEW_LINE = '\n';

// 找出text_2,text_1中最大相同子串，并标记子串在text_2中的位置
let isInclude = (text_1, text_2, separator) => {
	separator = separator || '';

	if (!text_1 || !text_2) throw '字符串不能为空';

	let rows_1   = text_1.split(separator);
	let rows_2   = text_2.split(separator);
	let l_1      = rows_1.length;
	let l_2      = rows_2.length;
	let result   = [];
	let same_row = [];
	let same_num;
	for (let start = 0; start < l_2; start++) {
		for (let point = start; point < l_2; ) {
			same_row.push(rows_2[point]);
			let isSub = text_1.includes(separator + same_row.join(separator) + separator);
			let isStart = text_1.match(new RegExp('^' + same_row.join(separator)));
			let isEnd = text_1.match(new RegExp(same_row.join(separator) + '$'));

			if (isSub || isStart || isEnd || !rows_2[point]) {
				if (same_row.length > result.length) {
					// 重置result
					result.length = 0;
					result.push(...same_row);
					same_num = point + 1;
				}
				point++;
			} else {
				// 重置查询子串，并跳出循环
				same_row.length = 0;
				break;
			}
		}
	}
	return {
		same  : result, // 有没找到相同子串用这个字段的length判断
		start : same_num - result.length, // 最长相同子串在t2开始位置
		end   : same_num, // 最长相同子串在t2结束位置(不包含)
	};
}

// text_2 基于 text_1 的修改
let diff = (text_1, text_2) => {
	text_1 = text_1.trim().replace(/\n+/g,'\n');
	text_2 = text_2.trim().replace(/\n+/g,'\n');
	let rows_1      = text_1.split(NEW_LINE);
	let rows_2      = text_2.split(NEW_LINE);
	let l_1         = rows_1.length;
	let l_2         = rows_2.length;
	let diff_result = new Array();

	let same_in_text_1 = isInclude(text_2, text_1, NEW_LINE);
	let same_in_text_2 = isInclude(text_1, text_2, NEW_LINE);
	console.log('same: ' , same_in_text_1, same_in_text_2);

	diff_result.push(...same_in_text_2.same);

	let before_row_2 = rows_2.slice(0, same_in_text_2.start);
	let before_row_1 = rows_1.slice(0, same_in_text_1.start);
	let after_row_2  = rows_2.slice(same_in_text_2.end);
	let after_row_1  = rows_1.slice(same_in_text_1.end);

	console.log('before: ', before_row_1, before_row_2);
	console.log('rows_1:', rows_1);
	console.log('after: ', after_row_1, after_row_2);

	if (same_in_text_1.same.length && same_in_text_1.same.join() !== '') {
		// before substring
		if (same_in_text_2.start === 0 && same_in_text_1.start !== 0) {
			diff_result.unshift(...before_row_1.map(item => '---' + item));
		}
		if (same_in_text_1.start === 0 && same_in_text_2.start !== 0) {
			diff_result.unshift(...before_row_2.map(item => '+++' + item));
		}
		if (same_in_text_1.start === 0 && same_in_text_2.start === 0) {
			return;
		}
		if (same_in_text_1.start !== 0 && same_in_text_2.start !== 0)  {
			let result = diff(before_row_1.join(NEW_LINE), before_row_2.join(NEW_LINE));
			diff_result.unshift(...result);
		}

		// after substring
		if (same_in_text_2.end === l_2 && same_in_text_1.end !== l_1) {
			diff_result.push(...after_row_1.map(item => '---' + item));
		}
		if (same_in_text_1.end === l_1 && same_in_text_2.end !== l_2) {
			diff_result.push(...after_row_2.map(item => '+++' + item));
		}
		if (same_in_text_1.end === l_1 && same_in_text_2.end === l_2) {
			return;
		}
		if (same_in_text_1.end !== l_1 && same_in_text_2.end !== l_2) {
			let result = diff(after_row_1.join(NEW_LINE), after_row_2.join(NEW_LINE));
			diff_result.push(...result);
		}
	} else {
		diff_result.unshift(...before_row_1.map(item => '---' + item));
		diff_result.unshift(...before_row_2.map(item => '+++' + item));
		diff_result.push(...after_row_1.map(item => '---' + item));
		diff_result.push(...after_row_2.map(item => '+++' + item));
	}
	return diff_result;
}

exports.isInclude = isInclude;
exports.diff = diff;