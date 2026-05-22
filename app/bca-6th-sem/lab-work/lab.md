
## 1. Basic Unix Commands

### Q1.1: List all files with permissions and ownership

**Command:**
```bash
ls -l
```

**Step-by-step:**
1. Open terminal
2. Navigate to desired directory: `cd /path/to/directory`
3. Execute: `ls -l`
4. For all files including hidden: `ls -la`

**Output explanation:**
```bash
-rw-r--r-- 1 user group 1234 Jan 01 12:00 file.txt
│          │ │    │     │    │            │
│          │ │    │     │    │            └─ filename
│          │ │    │     │    └─ modification time
│          │ │    │     └─ size in bytes
│          │ │    └─ group
│          │ └─ owner
│          └─ number of links
└─ permissions
```

---

### Q1.2: Display top 10 largest files

**Command:**
```bash
du -ah | sort -rh | head -10
```

**Step-by-step:**
1. `du -ah` - Display disk usage for all files in human-readable format
2. `sort -rh` - Sort in reverse order with human-readable numbers
3. `head -10` - Display first 10 lines

**Alternative (more accurate):**
```bash
find . -type f -exec du -h {} + | sort -rh | head -10
```

---

### Q1.3: Find and replace using sed

**Command:**
```bash
sed 's/oldword/newword/g' filename
```

**Step-by-step guide:**

**Method 1: Display changes (doesn't modify file)**
```bash
sed 's/old/new/g' file.txt
```

**Method 2: Save to new file**
```bash
sed 's/old/new/g' file.txt > newfile.txt
```

**Method 3: Edit file in-place**
```bash
sed -i 's/old/new/g' file.txt
```

**Example:**
```bash
# Create test file
echo "Hello World, Hello Unix" > test.txt

# Replace "Hello" with "Hi"
sed 's/Hello/Hi/g' test.txt

# Replace only first occurrence per line
sed 's/Hello/Hi/' test.txt

# Case-insensitive replacement
sed 's/hello/Hi/gi' test.txt
```

---

## 2. File and Directory Management

### Q2.1: Create directory structure

**Script: `create_project.sh`**
```bash
#!/bin/bash

# Create project directory structure
mkdir -p Project/Docs
mkdir -p Project/Src
mkdir -p Project/Bin

# Verify the structure
echo "Project structure created:"
tree Project

# Alternative verification if tree is not installed
echo -e "\nDirectory structure:"
ls -R Project
```

**Step-by-step execution:**
```bash
# Create the script
nano create_project.sh

# Paste the above code

# Save and exit (Ctrl+X, Y, Enter)

# Make executable
chmod +x create_project.sh

# Run the script
./create_project.sh
```

**Manual verification:**
```bash
find Project -type d
```

---

### Q2.2: Backup .txt files

**Script: `backup_txt.sh`**
```bash
#!/bin/bash

# Get current date
DATE=$(date +%Y-%m-%d)

# Create backup directory
BACKUP_DIR="Backup_$DATE"
mkdir -p "$BACKUP_DIR"

# Count .txt files
TXT_COUNT=$(ls *.txt 2>/dev/null | wc -l)

if [ $TXT_COUNT -eq 0 ]; then
    echo "No .txt files found in current directory"
    exit 1
fi

# Copy all .txt files to backup directory
cp *.txt "$BACKUP_DIR/"

# Display result
echo "Backup completed successfully!"
echo "Copied $TXT_COUNT .txt file(s) to $BACKUP_DIR"
ls -lh "$BACKUP_DIR"
```

**Step-by-step:**
```bash
# Create test files
touch file1.txt file2.txt file3.txt

# Create and run script
nano backup_txt.sh
# (paste code above)

chmod +x backup_txt.sh
./backup_txt.sh
```

---

## 3. Process Management

### Q3.1: List processes owned by current user

**Script: `my_processes.sh`**
```bash
#!/bin/bash

# Method 1: Using ps
echo "=== Processes owned by $USER ==="
ps -u $USER

# Method 2: More detailed output
echo -e "\n=== Detailed Process List ==="
ps -u $USER -f

# Method 3: With custom format
echo -e "\n=== Custom Format ==="
ps -u $USER -o pid,ppid,%cpu,%mem,cmd
```

**Direct commands:**
```bash
# Simple list
ps -u $USER

# With full details
ps aux | grep $USER

# Using top
top -u $USER
```

---

### Q3.2: Monitor CPU usage with alert

**Script: `cpu_monitor.sh`**
```bash
#!/bin/bash

# Set CPU threshold (percentage)
THRESHOLD=80

# Function to get CPU usage
get_cpu_usage() {
    top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}'
}

echo "Monitoring CPU usage (Threshold: $THRESHOLD%)"
echo "Press Ctrl+C to stop"

while true; do
    # Get current CPU usage
    CPU_USAGE=$(get_cpu_usage)
    CPU_INT=${CPU_USAGE%.*}
    
    # Display current usage
    echo "$(date '+%Y-%m-%d %H:%M:%S') - CPU Usage: ${CPU_USAGE}%"
    
    # Check if threshold exceeded
    if [ $CPU_INT -gt $THRESHOLD ]; then
        echo "⚠️  ALERT: CPU usage exceeded threshold! Current: ${CPU_USAGE}%"
        # Optional: Send notification or email
    fi
    
    # Wait 5 seconds before next check
    sleep 5
done
```

**Alternative simple version:**
```bash
#!/bin/bash

THRESHOLD=80

while true; do
    CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    echo "CPU: $CPU%"
    
    if (( $(echo "$CPU > $THRESHOLD" | bc -l) )); then
        echo "ALERT: High CPU usage!"
    fi
    
    sleep 5
done
```

---

## 4. Text Processing

### Q4.1: Extract columns using awk

**Sample CSV file: `data.csv`**
```csv
Name,Age,City,Salary
John,25,NYC,50000
Alice,30,LA,60000
Bob,35,Chicago,55000
```

**Script: `extract_columns.sh`**
```bash
#!/bin/bash

# Create sample CSV file
cat > data.csv << EOF
Name,Age,City,Salary
John,25,NYC,50000
Alice,30,LA,60000
Bob,35,Chicago,55000
EOF

echo "=== Original File ==="
cat data.csv

echo -e "\n=== Extracting 2nd and 4th columns ==="
awk -F',' '{print $2, $4}' data.csv

echo -e "\n=== With formatted output ==="
awk -F',' '{printf "Age: %-5s Salary: %s\n", $2, $4}' data.csv

echo -e "\n=== Skip header ==="
awk -F',' 'NR>1 {print $2, $4}' data.csv
```

**Direct commands:**
```bash
# Basic extraction
awk -F',' '{print $2, $4}' data.csv

# With column names
awk -F',' '{print "Age:", $2, "Salary:", $4}' data.csv

# Skip header line
awk -F',' 'NR>1 {print $2, $4}' data.csv
```

---

### Q4.2: Find pattern with grep and count

**Script: `pattern_search.sh`**
```bash
#!/bin/bash

# Create test file
cat > sample.txt << EOF
Unix is great
Linux is based on Unix
I love Unix programming
Unix shell scripting is powerful
This line has unix in lowercase
EOF

echo "=== Original File ==="
cat sample.txt

echo -e "\n=== Lines containing 'Unix' ==="
grep 'Unix' sample.txt

echo -e "\n=== Count of occurrences (case-sensitive) ==="
grep -o 'Unix' sample.txt | wc -l

echo -e "\n=== Count of lines containing pattern ==="
grep -c 'Unix' sample.txt

echo -e "\n=== Case-insensitive search ==="
grep -i 'unix' sample.txt

echo -e "\n=== Count (case-insensitive) ==="
grep -io 'unix' sample.txt | wc -l

echo -e "\n=== With line numbers ==="
grep -n 'Unix' sample.txt
```

**Direct commands:**
```bash
# Find pattern
grep 'pattern' filename

# Count lines with pattern
grep -c 'pattern' filename

# Count total occurrences
grep -o 'pattern' filename | wc -l

# Case-insensitive
grep -i 'pattern' filename

# With line numbers
grep -n 'pattern' filename
```

---

## 5. Shell Scripting Basics

### Q5.1: Calculate factorial

**Script: `factorial.sh`**
```bash
#!/bin/bash

# Function to calculate factorial
factorial() {
    local num=$1
    local fact=1
    
    if [ $num -lt 0 ]; then
        echo "Error: Negative numbers don't have factorial"
        return 1
    fi
    
    if [ $num -eq 0 ] || [ $num -eq 1 ]; then
        echo 1
        return 0
    fi
    
    for ((i=2; i<=num; i++)); do
        fact=$((fact * i))
    done
    
    echo $fact
}

# Main program
echo "Factorial Calculator"
echo "===================="
read -p "Enter a number: " number

# Validate input
if ! [[ "$number" =~ ^[0-9]+$ ]]; then
    echo "Error: Please enter a valid positive integer"
    exit 1
fi

result=$(factorial $number)
echo "Factorial of $number is: $result"
```

**Recursive version:**
```bash
#!/bin/bash

factorial() {
    if [ $1 -le 1 ]; then
        echo 1
    else
        last=$(factorial $(($1 - 1)))
        echo $(($1 * last))
    fi
}

read -p "Enter number: " num
echo "Factorial: $(factorial $num)"
```

**Step-by-step execution:**
```bash
chmod +x factorial.sh
./factorial.sh
# Enter: 5
# Output: Factorial of 5 is: 120
```

---

### Q5.2: Check file properties

**Script: `check_file.sh`**
```bash
#!/bin/bash

echo "File Property Checker"
echo "====================="
read -p "Enter filename: " filename

# Check if file exists
if [ ! -e "$filename" ]; then
    echo "❌ File does not exist: $filename"
    exit 1
fi

echo "✅ File exists: $filename"
echo ""
echo "File Properties:"
echo "================"

# Check file type
if [ -f "$filename" ]; then
    echo "📄 Type: Regular file"
elif [ -d "$filename" ]; then
    echo "📁 Type: Directory"
elif [ -L "$filename" ]; then
    echo "🔗 Type: Symbolic link"
else
    echo "❓ Type: Special file"
fi

# Check read permission
if [ -r "$filename" ]; then
    echo "✅ Readable: Yes"
else
    echo "❌ Readable: No"
fi

# Check write permission
if [ -w "$filename" ]; then
    echo "✅ Writable: Yes"
else
    echo "❌ Writable: No"
fi

# Check execute permission
if [ -x "$filename" ]; then
    echo "✅ Executable: Yes"
else
    echo "❌ Executable: No"
fi

# Additional information
echo ""
echo "Additional Information:"
echo "======================="
echo "Size: $(stat -f%z "$filename" 2>/dev/null || stat -c%s "$filename" 2>/dev/null) bytes"
echo "Owner: $(stat -f%Su "$filename" 2>/dev/null || stat -c%U "$filename" 2>/dev/null)"
echo "Permissions: $(stat -f%Sp "$filename" 2>/dev/null || stat -c%A "$filename" 2>/dev/null)"
echo "Last modified: $(stat -f%Sm "$filename" 2>/dev/null || stat -c%y "$filename" 2>/dev/null)"
```

**Simplified version:**
```bash
#!/bin/bash

read -p "Enter filename: " file

if [ -e "$file" ]; then
    echo "File exists"
    [ -r "$file" ] && echo "✓ Readable" || echo "✗ Not Readable"
    [ -w "$file" ] && echo "✓ Writable" || echo "✗ Not Writable"
    [ -x "$file" ] && echo "✓ Executable" || echo "✗ Not Executable"
else
    echo "File does not exist"
fi
```

**Testing:**
```bash
# Create test file
touch testfile.txt
chmod 644 testfile.txt

# Run script
./check_file.sh
# Enter: testfile.txt
```

---

## Quick Reference Card

### File Test Operators
```bash
-e file    # exists
-f file    # is regular file
-d file    # is directory
-r file    # is readable
-w file    # is writable
-x file    # is executable
-s file    # size > 0
-L file    # is symbolic link
```

### Comparison Operators
```bash
# Numeric
-eq  # equal
-ne  # not equal
-lt  # less than
-le  # less or equal
-gt  # greater than
-ge  # greater or equal

# String
=    # equal
!=   # not equal
-z   # zero length
-n   # non-zero length
```

### Common Commands Summary
```bash
ls -la          # list all files with details
du -h           # disk usage human-readable
find . -name    # find files by name
grep -i         # case-insensitive search
awk -F          # field separator
sed -i          # in-place edit
chmod +x        # make executable
ps aux          # all processes
top             # process monitor
```

---

## PCA2 – UNIX Shell Scripting & Commands

---

## Question 1: Shell Script to Compress and Decompress a `.tar.gz` File

```bash
#!/bin/bash

# -------- COMPRESS --------
echo "Enter the file name to compress:"
read filename

if [ -f "$filename" ]; then
        tar -czvf "${filename}.tar.gz" "$filename"
        echo "File compressed successfully: ${filename}.tar.gz"
else
        echo "File not found!"
        exit 1
fi

# -------- DECOMPRESS --------
echo "Decompressing ${filename}.tar.gz ..."
tar -xzvf "${filename}.tar.gz"
echo "File decompressed successfully!"
```

### Explanation of `tar` Flags:

| Flag | Meaning |
|------|---------|
| `-c` | Create a new archive |
| `-x` | Extract from archive |
| `-z` | Filter through gzip (compress/decompress) |
| `-v` | Verbose – show progress |
| `-f` | Specify the archive file name |

### Sample Run:
```
$ bash compress.sh
Enter the file name to compress:
notes.txt
a notes.txt
File compressed successfully: notes.txt.tar.gz
Decompressing notes.txt.tar.gz ...
x notes.txt
File decompressed successfully!
```

---

## Question 2: `zip`, `unzip`, `gzip`, `gunzip` Commands

---

### 1. `zip` – Compress files into a `.zip` archive

**Syntax:** `zip [archive_name.zip] [file(s)]`

```bash
$ zip myarchive.zip file1.txt file2.txt
    adding: file1.txt (deflated 40%)
    adding: file2.txt (deflated 35%)
```

---

### 2. `unzip` – Extract files from a `.zip` archive

**Syntax:** `unzip [archive_name.zip]`

```bash
$ unzip myarchive.zip
Archive:  myarchive.zip
    inflating: file1.txt
    inflating: file2.txt
```

#### `unzip` Options:

| Option | Description | Example |
|--------|-------------|---------|
| `-l` | List contents of zip file without extracting | `unzip -l myarchive.zip` |
| `-o` | Overwrite existing files without prompting | `unzip -o myarchive.zip` |
| `-n` | Never overwrite existing files | `unzip -n myarchive.zip` |

```bash
# List contents
$ unzip -l myarchive.zip
Archive:  myarchive.zip
    Length      Date    Time    Name
---------  ---------- -----   ----
             45  2024-01-10 10:00   file1.txt
             30  2024-01-10 10:01   file2.txt

# Overwrite without asking
$ unzip -o myarchive.zip

# Never overwrite (skip if file exists)
$ unzip -n myarchive.zip
```

---

### 3. `gzip` – Compress a single file (replaces original with `.gz`)

**Syntax:** `gzip [filename]`

```bash
$ gzip notes.txt
# Creates: notes.txt.gz  (original notes.txt is removed)
```

---

### 4. `gunzip` – Decompress a `.gz` file

**Syntax:** `gunzip [filename.gz]`

```bash
$ gunzip notes.txt.gz
# Restores: notes.txt (removes .gz file)
```

---

### Comparison Table:

| Command | Input | Output | Removes Original? |
|---------|-------|--------|-------------------|
| `zip` | Multiple files | `.zip` | No |
| `unzip` | `.zip` | Extracted files | No |
| `gzip` | Single file | `.gz` | Yes |
| `gunzip` | `.gz` | Original file | Yes |

---

## Question 3: Script to Check if a File Exists

```bash
#!/bin/bash

echo "Enter the filename to check:"
read fname

if [ -f "$fname" ]; then
        echo "File exists"
else
        echo "File does not exist"
fi
```

### Sample Run:
```bash
$ bash checkfile.sh
Enter the filename to check:
notes.txt
File exists

$ bash checkfile.sh
Enter the filename to check:
ghost.txt
File does not exist
```

> **Note:** `-f` checks if the path exists **and** is a regular file (not a directory).

---

## Question 4: File Permissions with `chmod`, `ls -l`, and `chown`

---

### a) Create a file named `Mainfile.txt`

```bash
$ touch Mainfile.txt
```

---

### b) Give owner read, write, and execute permissions using `chmod`

```bash
$ chmod 700 Mainfile.txt
# OR using symbolic method:
$ chmod u=rwx Mainfile.txt
```

---

### c) View permissions using `ls -l` and explain output

```bash
$ ls -l Mainfile.txt
-rwx------ 1 john students 0 Jan 10 10:00 Mainfile.txt
```

### Explanation of Each Part:

```
- rwx --- --- 1  john  students  0  Jan 10  10:00  Mainfile.txt
|  |    |   |  |   |      |     |     |       |        |
|  |    |   |  |   |      |     |     |       |        └─ File name
|  |    |   |  |   |      |     |     |       └─ Last modified time
|  |    |   |  |   |      |     |     └─ Last modified date
|  |    |   |  |   |      |     └─ File size (bytes)
|  |    |   |  |   |      └─ Group name
|  |    |   |  |   └─ Owner name
|  |    |   |  └─ Number of hard links
|  |    |   └─ Other permissions (--- = none)
|  |    └─ Group permissions (--- = none)
|  └─ Owner permissions (rwx = read, write, execute)
└─ File type (- = regular file, d = directory)
```

---

### d) Change the owner using `chown`

```bash
# Syntax: chown new_owner filename
$ sudo chown alice Mainfile.txt

# Change both owner and group
$ sudo chown alice:developers Mainfile.txt

# Verify
$ ls -l Mainfile.txt
-rwx------ 1 alice developers 0 Jan 10 10:00 Mainfile.txt
```

---

## Question 5: Script Using `grep` to Search a Word in a File

```bash
#!/bin/bash

echo "Enter the filename to search in:"
read filename

echo "Enter the word to search for:"
read word

if [ ! -f "$filename" ]; then
        echo "File not found!"
        exit 1
fi

echo "Lines containing '$word':"
echo "-------------------------------"
grep "$word" "$filename"

if [ $? -ne 0 ]; then
        echo "No lines found containing '$word'"
fi
```

### Sample Run:

```bash
# Content of data.txt:
# Hello World
# Welcome to Unix
# Unix is powerful
# Goodbye

$ bash searchword.sh
Enter the filename to search in:
data.txt
Enter the word to search for:
Unix
Lines containing 'Unix':
-------------------------------
Welcome to Unix
Unix is powerful
```

### Useful `grep` Variants:

```bash
grep -i "word" file.txt    # Case-insensitive search
grep -n "word" file.txt    # Show line numbers
grep -c "word" file.txt    # Count matching lines
grep -v "word" file.txt    # Lines NOT containing word
```

---

## Question 6: `join` Command to Combine Files on a Common Field

---

### Setup – Create Two Files:

```bash
# employees.txt (ID  Name)
$ cat employees.txt
101 Alice
102 Bob
103 Charlie

# salaries.txt (ID  Salary)
$ cat salaries.txt
101 50000
102 60000
103 55000
```

---

### Basic `join`:

```bash
$ join employees.txt salaries.txt
101 Alice 50000
102 Bob 60000
103 Charlie 55000
```

> `join` matches on the **first field** by default (common field = ID).

---

### Using `-1` and `-2` Options:

| Option | Description |
|--------|-------------|
| `-1 N` | Join on field N of file 1 |
| `-2 N` | Join on field N of file 2 |

```bash
# dept.txt: Name  Department
$ cat dept.txt
Alice HR
Bob IT
Charlie Finance

# info.txt: Department  Name  Location
$ cat info.txt
HR Alice NewYork
IT Bob London
Finance Charlie Paris
```

```bash
# Join on field 1 of dept.txt and field 2 of info.txt
$ join -1 1 -2 2 dept.txt info.txt
Alice HR HR NewYork
Bob IT IT London
Charlie Finance Finance Paris
```

> **`-1 1`** means use field 1 of `dept.txt` (Name)
> **`-2 2`** means use field 2 of `info.txt` (Name)

---

## Question 7: `tar` Command – Create, View, Extract, and Compress

---

### 1. Create an Archive

```bash
$ tar -cvf archive.tar file1.txt file2.txt
file1.txt
file2.txt
```
---

### 2. View (List) Contents of Archive

```bash
$ tar -tvf archive.tar
-rw-r--r-- user/group  45 2024-01-10 file1.txt
-rw-r--r-- user/group  30 2024-01-10 file2.txt
```

---

### 3. Extract an Archive

```bash
$ tar -xvf archive.tar
file1.txt
file2.txt
```

---

### 4. Create a Compressed `.tar.gz` File

```bash
# Method 1: Using tar with -z flag (tar + gzip together)
$ tar -czvf archive.tar.gz file1.txt file2.txt

# Method 2: Using tar and gzip separately
$ tar -cvf archive.tar file1.txt file2.txt
$ gzip archive.tar
# Produces: archive.tar.gz
```

---

### 5. Extract a `.tar.gz` File

```bash
$ tar -xzvf archive.tar.gz
```

---

### `tar` Flag Summary:

| Flag | Meaning |
|------|---------|
| `-c` | Create archive |
| `-x` | Extract archive |
| `-t` | List/view contents |
| `-v` | Verbose output |
| `-f` | Specify filename |
| `-z` | Compress/decompress with gzip |

---

## Question 8: Basic UNIX Commands

---

### a) Display Current Working Directory

```bash
$ pwd
/home/user/LabTest
```

---

### b) List All Files Including Hidden Ones

```bash
$ ls -la
total 8
drwxr-xr-x  2 user group 4096 Jan 10 10:00 .
drwxr-xr-x 10 user group 4096 Jan 10 09:50 ..
-rw-r--r--  1 user group    0 Jan 10 10:01 .hiddenfile
-rw-r--r--  1 user group   45 Jan 10 10:02 Unix
```

> `-a` shows hidden files (files starting with `.`), `-l` shows long format.

---

### c) Create Directory `LabTest` and Navigate Into It

```bash
$ mkdir LabTest
$ cd LabTest
$ pwd
/home/user/LabTest
```

---

### d) Create File `Unix` and Write Text Using `echo`

```bash
$ echo "Welcome to UNIX Programming Lab" > Unix
```

> `>` creates/overwrites the file. Use `>>` to **append** text.

---

### e) Display Content of `Unix`

```bash
$ cat Unix
Welcome to UNIX Programming Lab
```

---

### f) Copy `Unix` to a New File Called `Backup`

```bash
$ cp Unix Backup
$ ls
Backup  Unix
```

---

### g) Rename `Unix` to `Newfile.txt`

```bash
$ mv Unix Newfile.txt
$ ls
Backup  Newfile.txt
```

---

### h) Delete `Backup` File

```bash
$ rm Backup
$ ls
Newfile.txt
```

---

### Full Sequence Summary (Q8):

```bash
pwd                                             # a
ls -la                                          # b
mkdir LabTest && cd LabTest                     # c
echo "Welcome to UNIX Programming Lab" > Unix   # d
cat Unix                                        # e
cp Unix Backup                                  # f
mv Unix Newfile.txt                             # g
rm Backup                                       # h
```

---

> **Tip for Exam:** Always remember that `>` overwrites a file while `>>` appends to it. The `chmod 755` means owner has `rwx`, group has `r-x`, others have `r-x`.
