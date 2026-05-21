# UNIX/Linux Lab Exam — Complete Command Reference



## 1. `zip` / `unzip`

### What is `zip`?
- Compresses files into `.zip` format
- Supports **multiple files and folders**

### Syntax
```bash
zip archive_name.zip file1 file2
```

---

### Step-by-Step: Create a ZIP File

**Step 1 — Open Terminal**
```bash
Ctrl + Alt + T
```

**Step 2 — Create a test file (if needed)**
```bash
nano test.txt
# type some content, then CTRL+O → Enter → CTRL+X
```

**Step 3 — Create ZIP**
```bash
zip myfile.zip test.txt
```

**Step 4 — Verify ZIP was created**
```bash
ls
```
You will see `myfile.zip` listed.

---

### All `unzip` Options

| Command | Description |
|---|---|
| `unzip myfile.zip` | Extract all files from zip |
| `unzip myfile.zip -d myfolder` | Extract to a specific folder |
| `unzip -l myfile.zip` | View contents without extracting |
| `unzip -o myfile.zip` | Overwrite existing files without asking |
| `unzip -n myfile.zip` | Never overwrite existing files |
| `unzip -q myfile.zip` | Quiet mode — no detailed output |

---

### Step-by-Step: Extract ZIP File

```bash
# Extract normally
unzip myfile.zip

# Extract to specific folder
unzip myfile.zip -d myfolder

# View contents only
unzip -l myfile.zip
```

---

## 2. `gzip` / `gunzip`

### What is `gzip`?
- Compresses a **single file** into `.gz` format
- Original file is **removed** after compression

### Syntax
```bash
gzip filename
gunzip filename.gz
```

---

### Step-by-Step: Compress and Decompress

**Step 1 — Create a file**
```bash
nano test.txt
# Write something, save and exit
```

**Step 2 — Compress**
```bash
gzip test.txt
```
Result: `test.txt.gz` (original `test.txt` is removed)

**Step 3 — Verify**
```bash
ls
```

**Step 4 — Decompress**
```bash
gunzip test.txt.gz
```
Result: `test.txt` is restored.

---

### zip vs gzip — Key Difference

| Feature | `zip` | `gzip` |
|---|---|---|
| Multiple files | Yes | No |
| Format | `.zip` | `.gz` |
| Directory support | Yes | With `tar` |
| Common use | Windows/Linux | Linux/UNIX |

---

## 3. `tar` — Archiving

### What is `tar`?
- Used to **archive** (bundle) files/directories
- Can also **compress** when combined with `gzip`

### Syntax
```bash
tar [options] archive_name files
```

### Options Table

| Option | Meaning |
|---|---|
| `-c` | Create a new archive |
| `-x` | Extract archive |
| `-v` | Verbose (show process) |
| `-f` | Specify file name of archive |
| `-t` | View archive content |
| `-z` | Use gzip compression |

---

### Step-by-Step: Create Archive

**Step 1 — Create test files**
```bash
nano file1.txt   # write something, save
nano file2.txt   # write something, save
```

**Step 2 — Create archive**
```bash
tar -cvf myarchive.tar file1.txt file2.txt
```

**Step 3 — View archive contents**
```bash
tar -tvf myarchive.tar
```

**Step 4 — Extract archive**
```bash
tar -xvf myarchive.tar
```

---

### Step-by-Step: Create `.tar.gz` (Archive + Compress)

**Step 1 — Create compressed archive**
```bash
tar -czvf myfiles.tar.gz file1.txt file2.txt
```
This command:
- Creates archive using `tar`
- Compresses using `gzip`
- Saves as `myfiles.tar.gz`

**Step 2 — Extract `.tar.gz`**
```bash
tar -xzvf myfiles.tar.gz
```

---

### All `tar` Commands Summary

```bash
tar -cvf  backup.tar file1.txt file2.txt     # Create archive
tar -tvf  backup.tar                          # View archive contents
tar -xvf  backup.tar                          # Extract archive
tar -cvzf backup.tar.gz file1.txt file2.txt  # Create compressed archive
tar -xvzf backup.tar.gz                       # Extract compressed archive
```

---

## 4. `echo` & `bc`

### `echo` — Print to Terminal

```bash
echo Hello Ubuntu
# Output: Hello Ubuntu
```

**With variable:**
```bash
name=Sudip
echo $name
# Output: Sudip
```

---

### `bc` — Basic Calculator

- Used for **mathematical calculations** in terminal

```bash
echo 10+20 | bc
# Output: 30

echo 10+5 | bc
# Output: 15
```

---

### Step-by-Step: Use `bc`

```bash
# Simple addition
echo 10+20 | bc

# Subtraction
echo 50-15 | bc

# Multiplication
echo 5*6 | bc

# Division
echo 20/4 | bc
```

---

## 5. `cal` — Calendar

### What is `cal`?
- Displays calendar in terminal

### All `cal` Commands

| Command | Description |
|---|---|
| `cal` | Display current month calendar |
| `cal 2026` | Display full year calendar |
| `cal 5 2026` | Display specific month and year |

---

### Step-by-Step: Use `cal`

```bash
# Current month
cal

# Full year
cal 2026

# Specific month and year (May 2026)
cal 5 2026
```

---

## 6. `date` — Date & Time

### What is `date`?
- Displays current date and time

### All `date` Commands

| Command | Description |
|---|---|
| `date` | Current date and time |
| `date +%Y` | Only year |
| `date +%m` | Only month |
| `date +%d` | Only day |

---

### Step-by-Step: Use `date`

```bash
# Full date and time
date

# Only year
date +%Y

# Only month
date +%m

# Only day
date +%d
```

---

## 7. `pr` — Page Format

### What is `pr`?
- Displays file content in **page format**

### Syntax
```bash
pr [option] filename
```

### All `pr` Commands

| Command | Description |
|---|---|
| `pr test.txt` | Display file in page format |
| `pr -n test.txt` | Display with line numbers |

---

### Step-by-Step: Use `pr`

**Step 1 — Create a file**
```bash
nano test.txt
# Add some lines, save and exit
```

**Step 2 — Display in page format**
```bash
pr test.txt
```

**Step 3 — Display with line numbers**
```bash
pr -n test.txt
```

---

## 8. `who` — Logged-in Users

### What is `who`?
- Shows currently logged-in users

### All `who` Commands

| Command | Description |
|---|---|
| `who` | Show logged-in users |
| `who -a` | Show detailed information |

---

### Step-by-Step: Use `who`

```bash
# Basic usage
who

# Detailed info
who -a
```

---

## 9. `wc` — Word Count

### What is `wc`?
- Counts **lines**, **words**, **bytes**, **characters** in a file

### Syntax
```bash
wc [option] filename
```

### All `wc` Options

| Option | Description | Example Output |
|---|---|---|
| `wc -l` | Count lines | `5 file.txt` |
| `wc -w` | Count words | `20 file.txt` |
| `wc -c` | Count bytes | `120 file.txt` |
| `wc -m` | Count characters | `118 file.txt` |

---

### Step-by-Step: Use `wc`

**Step 1 — Create a file**
```bash
nano text.txt
```
Type:
```
Unix is easy
Linux is powerful
```
Save and exit.

**Step 2 — Count words**
```bash
wc -w text.txt
# Output: 6 text.txt
```

**Step 3 — Count characters**
```bash
wc -m text.txt
# Output: 30 text.txt
```

**Step 4 — Count lines**
```bash
wc -l text.txt
# Output: 2 text.txt
```

**Step 5 — Count bytes**
```bash
wc -c text.txt
# Output: 30 text.txt
```

---

## 10. `sort` — Sorting

### What is `sort`?
- Arranges lines of a file in **alphabetical** or **numerical** order

### Syntax
```bash
sort [option] filename
```

### All `sort` Options

| Option | Description |
|---|---|
| `-k` | Sort by a specific column (field) |
| `-n` | Numerical sort (by actual number value) |
| `-r` | Reverse sort (descending order) |
| `-t` | Define field separator |

---

### Step-by-Step: Sort Examples

**Step 1 — Create file**
```bash
cat > students.txt
```
Type:
```
101 Raju 85
102 Sima 95
103 Amit 75
104 Ravi 90
```
Press `CTRL+D`

---

**Step 2 — Sort by 3rd column (Marks)**
```bash
sort -k 3 students.txt
```
Output:
```
103 Amit 75
101 Raju 85
104 Ravi 90
102 Sima 95
```

---

**Step 3 — Numerical sort by marks**
```bash
sort -k 3 -n students.txt
```
> Without `-n`, numbers are sorted like text (wrong results)

---

**Step 4 — Reverse (descending) sort**
```bash
sort -k 3 -n -r students.txt
```
Output:
```
102 Sima 95
104 Ravi 90
101 Raju 85
103 Amit 75
```

---

**Step 5 — Sort by 2nd column (Name)**
```bash
sort -k 2 students.txt
```
Sorts names alphabetically.

---

**Step 6 — Sort CSV with custom delimiter**

Create CSV file:
```bash
cat > data.csv
```
Type:
```
101,Raju,85
102,Sima,95
103,Amit,75
```
Press `CTRL+D`

Sort by marks (3rd column):
```bash
sort -t "," -k 3 -n data.csv
```

---

### Why `-n` is Needed

Without `-n`:
```bash
sort numbers.txt
# Wrong output (text sort):
# 100
# 15
# 2
# 25
```

With `-n`:
```bash
sort -n numbers.txt
# Correct output:
# 2
# 15
# 25
# 100
```

---

### All `sort` Commands Summary

```bash
sort file.txt                      # Basic alphabetical sort
sort -k 2 file.txt                 # Sort by 2nd column
sort -k 3 -n file.txt              # Sort by 3rd column numerically
sort -k 3 -n -r file.txt           # Sort descending
sort -t "," -k 3 -n data.csv       # Sort CSV by 3rd column
sort -r fruits.txt                 # Reverse alphabetical
```

---

## 11. `join` — Join Files

### What is `join`?
- Combines two files based on a **common field**
- Works like matching records using a common column
- Both files should be **sorted first**

### Syntax
```bash
join file1.txt file2.txt

# For specific fields:
join -1 field_number -2 field_number file1.txt file2.txt
```

| Option | Meaning |
|---|---|
| `-1` | Field number of first file |
| `-2` | Field number of second file |

---

### Step-by-Step: Basic Join

**Step 1 — Create file1.txt**
```bash
cat > file1.txt
```
Type:
```
101 Raju
102 Sima
103 Amit
```
Press `CTRL+D`

**Step 2 — Create file2.txt**
```bash
cat > file2.txt
```
Type:
```
101 Delhi
102 Mumbai
103 Kolkata
```
Press `CTRL+D`

**Step 3 — View files**
```bash
cat file1.txt
cat file2.txt
```

**Step 4 — Join files**
```bash
join file1.txt file2.txt
```
Output:
```
101 Raju Delhi
102 Sima Mumbai
103 Amit Kolkata
```

---

### Step-by-Step: Join Using Specific Fields (`-1` and `-2`)

**Step 1 — Create emp.txt**
```bash
cat > emp.txt
```
Type:
```
Raju 101
Sima 102
Amit 103
```
Press `CTRL+D`

**Step 2 — Create dept.txt**
```bash
cat > dept.txt
```
Type:
```
Sales 101
HR 102
IT 103
```
Press `CTRL+D`

**Step 3 — Join using 2nd column of both files**
```bash
join -1 2 -2 2 emp.txt dept.txt
```
Output:
```
101 Raju Sales
102 Sima HR
103 Amit IT
```
Explanation:
- `-1 2` → use 2nd column of first file
- `-2 2` → use 2nd column of second file

---

## 12. `comm` — Compare Sorted Files

### What is `comm`?
- Compares two **sorted** files line by line
- Produces output in **3 columns**

### Syntax
```bash
comm file1.txt file2.txt
```

### 3 Columns of Output

| Column | Meaning |
|---|---|
| Column 1 | Lines **only in file1** |
| Column 2 | Lines **only in file2** |
| Column 3 | Lines **common in both** |

---

### Suppress Columns Using Options

| Command | Shows | Hides |
|---|---|---|
| `comm -1 file1 file2` | Column 2 + Column 3 | Column 1 |
| `comm -2 file1 file2` | Column 1 + Column 3 | Column 2 |
| `comm -3 file1 file2` | Column 1 + Column 2 | Column 3 |

---

### Step-by-Step: Use `comm`

**Step 1 — Create and sort file1.txt**
```bash
cat > file1.txt
```
Type:
```
apple
banana
mango
```
Press `CTRL+D`

**Step 2 — Create and sort file2.txt**
```bash
cat > file2.txt
```
Type:
```
apple
grape
mango
```
Press `CTRL+D`

**Step 3 — Sort both files first**
```bash
sort file1.txt -o file1.txt
sort file2.txt -o file2.txt
```

**Step 4 — Run comm**
```bash
comm file1.txt file2.txt
```

**Step 5 — Suppress columns**
```bash
comm -1 file1.txt file2.txt    # Hide lines only in file1
comm -2 file1.txt file2.txt    # Hide lines only in file2
comm -3 file1.txt file2.txt    # Hide common lines
```

---

## 13. `diff` — Line by Line Compare

### What is `diff`?
- Compares two files **line by line**
- Shows which lines are **different**

### Syntax
```bash
diff file1.txt file2.txt
```

---

### Step-by-Step: Use `diff`

**Step 1 — Create file1.txt**
```bash
cat > file1.txt
```
Type:
```
apple
banana
mango
orange
```
Press `CTRL+D`

**Step 2 — Create file2.txt**
```bash
cat > file2.txt
```
Type:
```
apple
banana
grape
orange
```
Press `CTRL+D`

**Step 3 — Run diff**
```bash
diff file1.txt file2.txt
```

Output:
```
3c3
< mango
---
> grape
```

**Reading the Output:**

| Symbol | Meaning |
|---|---|
| `3c3` | Line 3 of file1 **changed** to line 3 of file2 |
| `<` | Line from **file1** |
| `>` | Line from **file2** |
| `2d1` | Line 2 **deleted** from file1 |

---

## 14. `cmp` — Character by Character Compare

### What is `cmp`?
- Compares two files **character by character**
- Shows **first difference only** (position + line number)

### Syntax
```bash
cmp file1.txt file2.txt
```

---

### Step-by-Step: Use `cmp`

**Step 1 — Create fileA.txt**
```bash
cat > fileA.txt
```
Type:
```
Hello Linux
Welcome
```
Press `CTRL+D`

**Step 2 — Create fileB.txt**
```bash
cat > fileB.txt
```
Type:
```
Hello Linux
Welcome User
```
Press `CTRL+D`

**Step 3 — Compare**
```bash
cmp fileA.txt fileB.txt
```
Output:
```
fileA.txt fileB.txt differ: byte 22, line 2
```

**Step 4 — Silent comparison (returns exit code)**
```bash
cmp -s fileA.txt fileB.txt
echo $?
```
Output:
- `0` → Files are **same**
- `1` → Files are **different**

---

### diff vs cmp — Key Difference

| Feature | `diff` | `cmp` |
|---|---|---|
| Comparison | Line by line | Character by character |
| Output | Shows all changed lines | Shows first difference only |
| Used for | Text files | Text and binary files |
| Human readable | Yes | Less readable |
| Detailed result | Yes | No |

---

## 15. Shell Scripts — Step by Step

### What is a Shell Script?
- A file containing a list of Linux commands
- Executed together automatically
- File extension: `.sh`

### Steps to Create and Run Any Shell Script

| Step | Action | Command |
|---|---|---|
| 1 | Create script | `nano script.sh` |
| 2 | Write code | (write commands) |
| 3 | Save | `CTRL+O` → `Enter` → `CTRL+X` |
| 4 | Give permission | `chmod +x script.sh` |
| 5 | Run script | `./script.sh` |

---

### Script 1 — Directory Check Script

```bash
nano dircheck.sh
```

```bash
#!/bin/bash

echo "Enter the directory name:"
read dir_name

if [ -d "$dir_name" ]; then
    echo "Directory exists"
else
    mkdir "$dir_name"
    echo "Directory created"
fi
```

Save: `CTRL+O` → `Enter` → `CTRL+X`

```bash
chmod +x dircheck.sh
./dircheck.sh
```

**Output:**
```
Enter the directory name:
projects
Directory created
```

---

### Script 2 — Name and Age Script

```bash
nano intro.sh
```

```bash
#!/bin/bash

echo "Enter your name:"
read name

echo "Enter your age:"
read age

echo "Hello, $name. You are $age years old."
```

Save: `CTRL+O` → `Enter` → `CTRL+X`

```bash
chmod +x intro.sh
./intro.sh
```

**Output:**
```
Enter your name:
Abhra
Enter your age:
20
Hello, Abhra. You are 20 years old.
```

---

### Script 3 — Grep Search Script

```bash
nano search.sh
```

```bash
#!/bin/bash

echo "Enter the file name:"
read filename

echo "Enter the word to search:"
read word

grep "$word" "$filename"
```

Save: `CTRL+O` → `Enter` → `CTRL+X`

**Create sample data file:**
```bash
nano data.txt
```
Type:
```
Linux is powerful
Unix is stable
Linux is open source
```
Save and exit.

**Run the script:**
```bash
./search.sh
```

**Output:**
```
Enter the file name:
data.txt
Enter the word to search:
Linux

Linux is powerful
Linux is open source
```

---

### Script 4 — Compression Script

```bash
nano compress.sh
```

```bash
#!/bin/bash

echo "Enter the file name to compress:"
read filename

tar -czvf "$filename.tar.gz" "$filename"

echo "File compressed into $filename.tar.gz"

echo "Do you want to decompress it? (yes/no)"
read response

if [ "$response" == "yes" ]; then
    tar -xzvf "$filename.tar.gz"
    echo "File decompressed."
fi
```

Save: `CTRL+O` → `Enter` → `CTRL+X`

```bash
chmod +x compress.sh
```

**Create a test file:**
```bash
nano notes.txt
```
Type:
```
This is a test file
```
Save and exit.

**Run:**
```bash
./compress.sh
```

**Output:**
```
Enter the file name to compress:
notes.txt
notes.txt
File compressed into notes.txt.tar.gz
Do you want to decompress it? (yes/no)
yes
notes.txt
File decompressed.
```

---

### Common Beginner Mistakes

#### Mistake 1 — Forgetting `chmod +x`
```
Permission denied
```
Fix:
```bash
chmod +x filename.sh
```

---

#### Mistake 2 — Running Without `./`
Wrong:
```bash
script.sh
```
Correct:
```bash
./script.sh
```

---

#### Mistake 3 — Forgetting `fi`

Every `if` must end with:
```bash
fi
```

---

#### Mistake 4 — Wrong Text Editor

**Never** use Notepad or MS Word for shell scripts.

**Use:** `nano`, `vim`, or VS Code

---

### Shortcut Method — Run Without `chmod`

```bash
bash intro.sh
```
This skips the permission step. Useful for quick testing.

---

## Master Quick Reference — All Commands

### zip / unzip
```bash
zip myfile.zip file1.txt file2.txt     # Create zip
unzip myfile.zip                        # Extract zip
unzip myfile.zip -d myfolder           # Extract to folder
unzip -l myfile.zip                    # View contents
unzip -o myfile.zip                    # Overwrite without asking
unzip -n myfile.zip                    # Never overwrite
unzip -q myfile.zip                    # Quiet mode
```

### gzip / gunzip
```bash
gzip file.txt                          # Compress file
gunzip file.txt.gz                     # Decompress file
```

### tar
```bash
tar -cvf  archive.tar file1 file2      # Create archive
tar -tvf  archive.tar                  # View archive
tar -xvf  archive.tar                  # Extract archive
tar -cvzf archive.tar.gz file1 file2  # Create + compress
tar -xvzf archive.tar.gz              # Extract compressed
```

### echo / bc
```bash
echo Hello Ubuntu                      # Print text
name=Sudip && echo $name               # Variable
echo 10+20 | bc                        # Calculator
```

### cal
```bash
cal                                    # Current month
cal 2026                               # Full year
cal 5 2026                             # Specific month/year
```

### date
```bash
date                                   # Full date and time
date +%Y                               # Year only
date +%m                               # Month only
date +%d                               # Day only
```

### pr
```bash
pr test.txt                            # Page format
pr -n test.txt                         # With line numbers
```

### who
```bash
who                                    # Logged-in users
who -a                                 # Detailed info
```

### wc
```bash
wc -l file.txt                         # Count lines
wc -w file.txt                         # Count words
wc -c file.txt                         # Count bytes
wc -m file.txt                         # Count characters
```

### sort
```bash
sort file.txt                          # Alphabetical sort
sort -k 2 file.txt                     # Sort by 2nd column
sort -k 3 -n file.txt                  # Numeric sort by 3rd col
sort -k 3 -n -r file.txt              # Numeric reverse sort
sort -t "," -k 3 -n data.csv          # CSV sort by 3rd col
sort -r file.txt                       # Reverse alphabetical
```

### join
```bash
join file1.txt file2.txt               # Join on 1st column
join -1 2 -2 2 file1.txt file2.txt    # Join on 2nd column of both
```

### comm
```bash
comm file1.txt file2.txt               # Compare sorted files
comm -1 file1.txt file2.txt            # Hide column 1
comm -2 file1.txt file2.txt            # Hide column 2
comm -3 file1.txt file2.txt            # Hide common lines
```

### diff
```bash
diff file1.txt file2.txt               # Line by line compare
```

### cmp
```bash
cmp file1.txt file2.txt                # Char by char compare
cmp -s file1.txt file2.txt            # Silent (exit code only)
echo $?                                # 0=same, 1=different
```

### Shell Script
```bash
nano script.sh                         # Create script
chmod +x script.sh                     # Give permission
./script.sh                            # Run script
bash script.sh                         # Run without chmod
```