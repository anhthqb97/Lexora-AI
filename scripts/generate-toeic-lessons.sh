#!/usr/bin/env bash
# Generate lib/modules/toeic/lessons.ts with 105 lesson entries
set -euo pipefail
OUT="lib/modules/toeic/lessons.ts"
{
  echo 'import type { SkillTag } from "./constants";'
  echo ""
  echo "export type ToeicLesson = {"
  echo "  id: string;"
  echo "  title: string;"
  echo "  titleVi: string;"
  echo "  section: \"listening\" | \"reading\";"
  echo "  part: number;"
  echo "  skillTag: SkillTag;"
  echo "  level: string;"
  echo "};"
  echo ""
  echo "export const TOEIC_LESSONS: ToeicLesson[] = ["
  n=1
  for section in listening reading; do
    if [[ "$section" == listening ]]; then parts="1 2 3 4"; max=40; else parts="5 6 7"; max=65; fi
    count=0
    for part in $parts; do
      while [[ $count -lt $max ]]; do
        id=$(printf "TL-%03d" "$n")
        tag="grammar"
        if [[ "$section" == listening ]]; then tag="listening-detail"; fi
        if (( n % 5 == 0 )); then tag="vocabulary"; fi
        echo "  { id: \"$id\", title: \"Lesson $n Part $part\", titleVi: \"Bài $n Phần $part\", section: \"$section\", part: $part, skillTag: \"$tag\", level: \"B1\" },"
        n=$((n + 1))
        count=$((count + 1))
      done
    done
  done
  echo "];"
  echo ""
  echo "export function listLessons(): ToeicLesson[] {"
  echo "  return TOEIC_LESSONS;"
  echo "}"
  echo ""
  echo "export function getLesson(id: string): ToeicLesson | undefined {"
  echo "  return TOEIC_LESSONS.find((l) => l.id === id);"
  echo "}"
} > "$OUT"
echo "Wrote $OUT with $((n - 1)) lessons"
