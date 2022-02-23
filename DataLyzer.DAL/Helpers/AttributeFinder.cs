using System;
using System.Linq;
using System.Reflection;

namespace DataLyzer.DAL.Helpers
{
    public class AttributeFinder
    {
        public delegate TResult GetValue_t<in T, out TResult>(T arg1);
        public static TValue GetAttributValue<TAttribute, TValue>(MemberInfo mi, GetValue_t<TAttribute, TValue> value) where TAttribute : Attribute
        {

            TAttribute[] objAtts = (TAttribute[])mi.GetCustomAttributes(typeof(TAttribute), true);
            TAttribute att = (objAtts == null || objAtts.Length < 1) ? default(TAttribute) : objAtts[0];

            if (att != null)
            {
                return value(att);
            }
            return default(TValue);
        }
        public static TValue GetAttributeValue<T1, TAttribute, TValue>(Func<TAttribute, TValue> valueSelector) where TAttribute : Attribute
        {
            TAttribute att = typeof(T1).GetTypeInfo().GetCustomAttributes(typeof(TAttribute), true).FirstOrDefault() as TAttribute;
            if (att != null)
            {
                return valueSelector(att);
            }
            return default(TValue);
        }
    }
}
